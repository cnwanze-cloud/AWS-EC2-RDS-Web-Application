# ☁️ CloudCare — AWS EC2 + RDS CRUD Web Application

A cloud-hosted patient management web application built with **HTML, CSS, JavaScript, PHP, MySQL, Amazon EC2, and Amazon RDS**.

The application allows users to add, view, update, and delete patient records through a modern web interface. The website is hosted on an Amazon EC2 instance, while patient data is persistently stored in an Amazon RDS MySQL database.

---

## 📌 Project Overview

CloudCare is a full-stack cloud application designed to demonstrate how a web application can communicate with a managed relational database in AWS.

The application consists of:

- A visually appealing frontend built with **HTML, CSS, and JavaScript**
- A **PHP backend** running on Apache
- An **Amazon EC2** instance hosting the web application
- An **Amazon RDS MySQL** database storing patient records
- Secure communication between EC2 and RDS using **AWS Security Groups**

The browser communicates with the PHP backend running on EC2. PHP then communicates with Amazon RDS to perform database operations.

### Application Flow

```text
                    INTERNET
                       │
                       ▼
              ┌─────────────────┐
              │       EC2       │
              │                 │
              │    Apache       │
              │      │          │
              │     PHP         │
              │      │          │
              │ HTML/CSS/JS     │
              └────────┬────────┘
                       │
                       │ MySQL / TCP 3306
                       ▼
              ┌─────────────────┐
              │   Amazon RDS    │
              │     MySQL       │
              │                 │
              │    cloudcare    │
              │        │        │
              │     patients    │
              └─────────────────┘
```

---

# 🎯 Project Objectives

The main objectives of this project are to:

1. Deploy a web application on Amazon EC2.
2. Install and configure Apache as a web server.
3. Install and configure PHP.
4. Create a MySQL database using Amazon RDS.
5. Connect a PHP application running on EC2 to RDS.
6. Implement CRUD operations.
7. Dynamically display database records in an HTML table.
8. Configure AWS Security Groups for secure communication.
9. Demonstrate cloud-based application architecture.
10. Document and version-control the project using GitHub.

---

# 🛠️ Technologies Used

## Frontend

- HTML5
- CSS3
- JavaScript
- Fetch API
- Responsive Web Design

## Backend

- PHP
- Apache HTTP Server
- MySQLi
- REST-style PHP endpoints

## AWS

- Amazon EC2
- Amazon RDS
- Amazon VPC
- AWS Security Groups

## Development Tools

- Git
- GitHub
- MySQL Workbench
- SSH
- Linux terminal

---

# 🏗️ Architecture

The application follows a simple three-layer architecture.

```text
┌─────────────────────────────────────┐
│           PRESENTATION              │
│                                     │
│          HTML + CSS + JS            │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│             APPLICATION             │
│                                     │
│       Apache + PHP on EC2           │
└──────────────────┬──────────────────┘
                   │
                   │ MySQL
                   ▼
┌─────────────────────────────────────┐
│               DATA                  │
│                                     │
│        Amazon RDS MySQL             │
└─────────────────────────────────────┘
```

---

# ☁️ AWS Architecture

The recommended AWS network architecture is:

```text
                         INTERNET
                            │
                            │ HTTP/HTTPS
                            ▼
                    ┌───────────────┐
                    │      EC2      │
                    │ Web Server    │
                    └───────┬───────┘
                            │
                            │ TCP 3306
                            ▼
                    ┌───────────────┐
                    │      RDS      │
                    │     MySQL     │
                    └───────────────┘
```

The EC2 instance and RDS database are located within the same VPC.

The RDS security group allows MySQL traffic on port `3306` only from the EC2 security group.

---

# 📂 Project Structure

```text
cloudcare-rds-crud/
│
├── README.md
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── backend/
│   ├── db.php
│   ├── add_patient.php
│   ├── get_patients.php
│   ├── update_patient.php
│   └── delete_patient.php
│
├── database/
│   └── schema.sql
│
├── screenshots/
│   ├── dashboard.png
│   ├── patient-form.png
│   ├── patient-table.png
│   └── rds-database.png
│
└── .gitignore
```

---

# 🗄️ Database Design

The project uses an Amazon RDS MySQL database called:

```text
cloudcare
```

The database contains a table called:

```text
patients
```

## Patients Table

| Column | Data Type | Description |
|---|---|---|
| id | INT | Unique patient identifier |
| full_name | VARCHAR(100) | Patient's full name |
| age | INT | Patient's age |
| gender | VARCHAR(20) | Patient's gender |
| phone | VARCHAR(30) | Patient's phone number |
| diagnosis | VARCHAR(255) | Patient diagnosis |
| created_at | TIMESTAMP | Record creation time |

---

# 🧱 Database Schema

The database and table are manually created in Amazon RDS.

```sql
CREATE DATABASE cloudcare;

USE cloudcare;

CREATE TABLE patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(20) NOT NULL,
    phone VARCHAR(30),
    diagnosis VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

The website does not create the database or table.

Instead, the application uses the existing table to perform CRUD operations.

---

# 🔄 CRUD Operations

The application implements all four fundamental database operations.

## Create

Users can add a new patient through the web form.

```text
Website
   ↓
JavaScript
   ↓
add_patient.php
   ↓
RDS
   ↓
INSERT
```

---

## Read

Patient records are retrieved from RDS and dynamically displayed in the website.

```text
RDS
   ↓
get_patients.php
   ↓
JavaScript
   ↓
HTML Table
```

---

## Update

Users can modify an existing patient record.

```text
Website
   ↓
JavaScript
   ↓
update_patient.php
   ↓
RDS
   ↓
UPDATE
```

---

## Delete

Users can remove an existing patient record.

```text
Website
   ↓
JavaScript
   ↓
delete_patient.php
   ↓
RDS
   ↓
DELETE
```

---

# 📄 Application Files

## `index.html`

The main webpage.

It contains:

- Dashboard
- Patient registration form
- Patient records table
- Buttons for editing and deleting records
- Application navigation
- User interface elements

It is responsible for the structure of the application.

---

## `style.css`

Controls the visual appearance of the application.

It provides:

- Layout
- Colors
- Typography
- Cards
- Buttons
- Forms
- Tables
- Responsive design
- Modal windows
- Hover effects

---

## `script.js`

Contains the frontend application logic.

It communicates with the PHP backend using the JavaScript Fetch API.

For example:

```text
Add Patient
     ↓
JavaScript
     ↓
add_patient.php
```

It also retrieves patient records and dynamically generates the HTML table.

---

## `db.php`

Creates the connection between PHP and Amazon RDS MySQL.

```text
PHP
 │
 ▼
db.php
 │
 ▼
Amazon RDS
```

Database credentials should never be committed to GitHub.

---

## `add_patient.php`

Receives patient information from the frontend and inserts it into the database.

Uses:

```sql
INSERT
```

---

## `get_patients.php`

Retrieves patient records from the database.

Uses:

```sql
SELECT
```

The results are returned to JavaScript as JSON.

---

## `update_patient.php`

Updates an existing patient record.

Uses:

```sql
UPDATE
```

---

## `delete_patient.php`

Deletes a patient record.

Uses:

```sql
DELETE
```

---

# 🚀 Deployment Guide

## 1. Create an RDS MySQL Database

From the AWS Console:

```text
AWS Console
    ↓
RDS
    ↓
Databases
    ↓
Create Database
    ↓
MySQL
```

Configure:

- VPC
- Subnets
- Database credentials
- Security Group
- Database instance

---

## 2. Create the Database

Connect to RDS using MySQL Workbench or another MySQL client.

Run:

```sql
CREATE DATABASE cloudcare;
```

Then:

```sql
USE cloudcare;
```

Create the patients table:

```sql
CREATE TABLE patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(20) NOT NULL,
    phone VARCHAR(30),
    diagnosis VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# 3. Launch an EC2 Instance

Launch an Amazon Linux EC2 instance.

Configure the EC2 Security Group to allow:

```text
SSH   TCP   22
HTTP  TCP   80
```

SSH should preferably be restricted to your own IP address.

---

# 4. Connect to EC2

```bash
ssh -i your-key.pem ec2-user@YOUR_EC2_PUBLIC_IP
```

---

# 5. Install Apache

```bash
sudo dnf update -y
sudo dnf install httpd -y
```

Start Apache:

```bash
sudo systemctl start httpd
```

Enable Apache at startup:

```bash
sudo systemctl enable httpd
```

Verify:

```bash
sudo systemctl status httpd
```

---

# 6. Install PHP

```bash
sudo dnf install php php-mysqli -y
```

Restart Apache:

```bash
sudo systemctl restart httpd
```

Verify PHP:

```bash
php -v
```

---

# 7. Upload the Application

The application files should be placed in:

```text
/var/www/html/
```

Example:

```text
/var/www/html/
│
├── index.html
├── style.css
├── script.js
│
└── api/
    ├── db.php
    ├── add_patient.php
    ├── get_patients.php
    ├── update_patient.php
    └── delete_patient.php
```

---

# 8. Configure the Database Connection

Update `db.php` with the RDS endpoint and database credentials.

Example:

```php
<?php

$host = "YOUR-RDS-ENDPOINT";
$username = "admin";
$password = "YOUR-PASSWORD";
$database = "cloudcare";

$conn = new mysqli(
    $host,
    $username,
    $password,
    $database
);

if ($conn->connect_error) {
    http_response_code(500);
    die("Database connection failed.");
}

$conn->set_charset("utf8mb4");

?>
```

**Do not commit this file containing real credentials to GitHub.**

---

# 🔐 Security Configuration

The EC2 and RDS Security Groups should be configured so that the database is not unnecessarily exposed to the public internet.

Recommended configuration:

```text
Internet
   │
   │ HTTP/HTTPS
   ▼
EC2 Security Group
   │
   │ TCP 3306
   │
   ▼
RDS Security Group
```

The RDS Security Group should allow:

```text
MySQL/Aurora
TCP
3306
Source: EC2 Security Group
```

Avoid:

```text
3306
0.0.0.0/0
```

because this exposes the database to the internet.

---

# 🧪 Testing

The application should be tested layer by layer.

## Test 1 — EC2

Open:

```text
http://YOUR_EC2_PUBLIC_IP
```

The website should load.

---

## Test 2 — Apache

Check:

```bash
sudo systemctl status httpd
```

Expected:

```text
Active: active (running)
```

---

## Test 3 — PHP

Check:

```bash
php -v
```

---

## Test 4 — EC2 to RDS

Install a MySQL-compatible client if necessary and test:

```bash
mysql -h YOUR-RDS-ENDPOINT -u admin -p
```

---

## Test 5 — Database

Run:

```sql
USE cloudcare;

SHOW TABLES;
```

Expected:

```text
patients
```

---

## Test 6 — Create

Add a patient through the website.

Verify in MySQL:

```sql
SELECT * FROM patients;
```

---

## Test 7 — Read

Refresh the website.

The patient record should appear in the HTML table.

---

## Test 8 — Update

Edit an existing patient and verify:

```sql
SELECT * FROM patients;
```

---

## Test 9 — Delete

Delete a patient from the website and verify that the record has been removed from RDS.

---

# 🐛 Troubleshooting

## Apache isn't running

```bash
sudo systemctl status httpd
```

Restart:

```bash
sudo systemctl restart httpd
```

---

## Check Apache errors

```bash
sudo tail -f /var/log/httpd/error_log
```

---

## Check whether PHP is installed

```bash
php -v
```

---

## RDS connection fails

Check:

- RDS status
- RDS endpoint
- RDS username
- RDS password
- RDS Security Group
- EC2 Security Group
- Port `3306`
- VPC configuration
- Subnet configuration
- Network ACLs

---

# 🔒 Security Improvements

For a production-quality deployment, the following improvements should be implemented:

### 1. AWS Secrets Manager

Database credentials should be stored securely instead of being hardcoded in PHP.

```text
PHP
 ↓
AWS Secrets Manager
 ↓
RDS Credentials
```

### 2. HTTPS

Configure HTTPS using an appropriate AWS architecture with TLS certificates.

### 3. Private RDS

RDS should preferably remain in private subnets and should not require a public IP.

### 4. Prepared Statements

Use MySQL prepared statements for user-supplied values to reduce SQL injection risks.

### 5. Input Validation

Validate:

- Names
- Age
- Phone numbers
- Gender
- Diagnosis

both on the frontend and backend.

### 6. Least-Privilege Access

Use IAM and database permissions according to the principle of least privilege.

---

# 📊 Example Application Workflow

A user adds a patient:

```text
User enters patient information
             │
             ▼
        HTML Form
             │
             ▼
        JavaScript
             │
             ▼
     add_patient.php
             │
             ▼
           db.php
             │
             ▼
       Amazon RDS
             │
             ▼
      patients table
             │
             ▼
       Success response
             │
             ▼
     Refresh patient list
             │
             ▼
       HTML data table
```

---

# 📈 Future Improvements

Possible future enhancements include:

- 🔐 User authentication
- 👤 Role-based access control
- 🔎 Patient search
- 🔽 Filtering and sorting
- 📄 Pagination
- 📊 Dashboard statistics
- 📈 Patient analytics
- 📱 Improved mobile responsiveness
- 🔒 HTTPS
- 🔑 AWS Secrets Manager
- 📝 Audit logging
- ☁️ CloudWatch monitoring
- 🚨 CloudWatch alarms
- 🗄️ Automated database backups
- 🌐 Route 53 custom domain
- ⚖️ Application Load Balancer
- 📦 Docker containerization
- 🚀 CI/CD deployment using GitHub Actions

---

# 📚 AWS Services Demonstrated

| AWS Service | Purpose |
|---|---|
| Amazon EC2 | Hosts the web application |
| Amazon RDS | Managed MySQL database |
| Amazon VPC | Provides network isolation |
| Security Groups | Controls inbound/outbound traffic |
| IAM | Controls AWS permissions |
| CloudWatch | Potential monitoring/logging extension |

---

# 🎓 Skills Demonstrated

This project demonstrates practical experience with:

- AWS EC2
- Amazon RDS
- MySQL
- Linux
- Apache
- PHP
- HTML
- CSS
- JavaScript
- SQL
- CRUD operations
- REST-style APIs
- Database connectivity
- VPC networking
- Security Groups
- SSH
- Git
- GitHub
- Cloud architecture
- Application troubleshooting

---

# 📸 Screenshots

Add screenshots of the completed application here.

### Dashboard

```text
screenshots/dashboard.png
```

### Patient Registration

```text
screenshots/patient-form.png
```

### Patient Records

```text
screenshots/patient-table.png
```

### Amazon RDS Database

```text
screenshots/rds-database.png
```

---

# ⚠️ Important Security Notice

Never upload sensitive information to GitHub.

Do **not** commit:

```text
❌ RDS passwords
❌ AWS access keys
❌ AWS secret keys
❌ Private SSH keys
❌ API keys
❌ Database credentials
```

Use `.gitignore` and environment variables or AWS Secrets Manager to protect sensitive information.

---

# 👨‍💻 Author

**Chigozie Samuel Nwanze**

Cloud Computing | AWS | Linux | PHP | MySQL | Web Development

---

# ⭐ Project Summary

CloudCare demonstrates how a traditional web application can be deployed using AWS cloud infrastructure.

The project separates the application and database layers:

```text
                CLOUDCARE
                    │
        ┌───────────┴───────────┐
        │                       │
     EC2 SERVER              RDS MYSQL
        │                       │
     Apache                  Database
        │                       │
      PHP                   cloudcare
        │                       │
   HTML/CSS/JS               patients
        │
      CRUD
```

The result is a functional cloud-hosted CRUD application with a web interface running on EC2 and persistent relational data stored in Amazon RDS.
