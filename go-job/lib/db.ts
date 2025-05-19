import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'JLMayo_227675',
  port: 5432,
  database: 'Go-Job'
});

export async function executeQuery(query: string, params?: any[]) {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query(query, params);
      return { success: true, data: result.rows };
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Database query error:', error);
    return { success: false, error: 'Database error' };
  }
}

export async function getUserByEmail(email: string) {
  const query = `
    SELECT a.account_id, a.account_email, a.account_password, a.account_role,
           e.employee_id, e.first_name, e.last_name, e.middle_name, e.address_id
    FROM account a
    LEFT JOIN employee e ON a.account_id = e.employee_id
    WHERE a.account_email = $1
  `;
  return executeQuery(query, [email]);
}

export async function verifyUserCredentials(email: string, password: string) {
  const query = `
    SELECT account_id, account_email, account_role
    FROM account
    WHERE account_email = $1 AND account_password = crypt($2, account_password)
  `;
  return executeQuery(query, [email, password]);
}

export async function createUser(userData: {
  email: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  address: {
    street: string;
    barangay: string;
    city: string;
    province: string;
  };
}) {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Insert address
    const addressQuery = `
      INSERT INTO address (street_name, barangay_name, city_name, province_name)
      VALUES ($1, $2, $3, $4)
      RETURNING address_id
    `;
    const addressValues = [
      userData.address.street,
      userData.address.barangay,
      userData.address.city,
      userData.address.province
    ];
    const addressResult = await client.query(addressQuery, addressValues);
    const addressId = addressResult.rows[0].address_id;
    
    // Create account
    const accountQuery = `
      INSERT INTO account (account_email, account_password, account_role)
      VALUES ($1, crypt($2, gen_salt('bf')), $3)
      RETURNING account_id
    `;
    const accountValues = [userData.email, userData.password, userData.role];
    const accountResult = await client.query(accountQuery, accountValues);
    const accountId = accountResult.rows[0].account_id;
    
    // Create employee
    const employeeQuery = `
      INSERT INTO employee (employee_id, first_name, last_name, middle_name, address_id)
      VALUES ($1, $2, $3, $4, $5)
    `;
    const employeeValues = [
      accountId,
      userData.firstName,
      userData.lastName,
      userData.middleName || null,
      addressId
    ];
    await client.query(employeeQuery, employeeValues);
    
    await client.query('COMMIT');
    
    return { success: true, accountId };
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating user:', error);
    return { success: false, error: 'Failed to create user' };
  } finally {
    client.release();
  }
}
