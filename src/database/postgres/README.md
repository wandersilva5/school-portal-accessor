
# School Portal Database

This directory contains PostgreSQL schema definitions for the School Portal application.

## Files Organization

The SQL scripts are organized by domain and should be executed in the following order:

1. `00_init_schema.sql` - Creates the schema
2. `01_users.sql` - User account tables
3. `02_academic.sql` - Classes, subjects, and rooms
4. `03_schedule.sql` - Class schedules and periods
5. `04_assessments.sql` - Grades and assessments
6. `05_announcements.sql` - School announcements
6. `06_financial.sql` - Student financial records
7. `07_attendance.sql` - Student attendance tracking
8. `08_communications.sql` - Messages and notifications
9. `09_system.sql` - System settings and audit logs
10. `10_indexes.sql` - Performance optimization indexes

## Database Schema

This schema supports all the core functionality of the School Portal application, including:

- User management (students, teachers, administrators, guardians)
- Academic structure (classes, subjects, rooms)
- Scheduling system
- Grading and assessment tracking
- School announcements
- Financial records
- Attendance tracking
- Internal communication
- System configuration and auditing

## Implementation Notes

- All tables use UUID primary keys
- Timestamps are stored with time zone information
- Foreign key constraints ensure data integrity
- Appropriate indexes are created for query performance
- Check constraints enforce data validation rules

## Usage

To apply these scripts to a PostgreSQL database:

```bash
# Connect to your PostgreSQL server
psql -U your_username -d your_database

# Execute the scripts in order
\i 00_init_schema.sql
\i 01_users.sql
# ... and so on
```

Or use a migration tool like Flyway or Liquibase for more controlled deployments.
