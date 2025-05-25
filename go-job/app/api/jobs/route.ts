import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres({
  host: 'localhost',
  port: 5432,
  database: 'Go-Job',
  username: 'postgres',
  password: 'Lance0516',
});

export async function GET(req: NextRequest) {
  try {
    const featuredJobs = await sql`
      SELECT 
        j.job_id, 
        j.job_name, 
        j.job_description,
        j.job_salary,
        c.company_name,
        jt.job_type_name,
        ARRAY_AGG(jc.job_category_name) as categories
      FROM job j
      JOIN company c ON j.company_id = c.company_id
      JOIN job_type jt ON j.job_type_id = jt.job_type_id
      LEFT JOIN job_category_list jcl ON j.job_id = jcl.job_id
      LEFT JOIN job_category jc ON jcl.job_category_id = jc.job_category_id
      GROUP BY j.job_id, j.job_name, j.job_description, j.job_salary, c.company_name, jt.job_type_name
      ORDER BY CAST(j.job_salary AS INTEGER) DESC NULLS LAST
      LIMIT 5
    `;

    const availableJobs = await sql`
      SELECT 
        j.job_id, 
        j.job_name, 
        j.job_description,
        j.job_salary,
        c.company_name,
        jt.job_type_name,
        ARRAY_AGG(jc.job_category_name) as categories
      FROM job j
      JOIN company c ON j.company_id = c.company_id
      JOIN job_type jt ON j.job_type_id = jt.job_type_id
      LEFT JOIN job_category_list jcl ON j.job_id = jcl.job_id
      LEFT JOIN job_category jc ON jcl.job_category_id = jc.job_category_id
      GROUP BY j.job_id, j.job_name, j.job_description, j.job_salary, c.company_name, jt.job_type_name
      ORDER BY j.job_id
      OFFSET 5 LIMIT 5
    `;

    return NextResponse.json({
      success: true,
      data: {
        featuredJobs,
        availableJobs
      }
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}
