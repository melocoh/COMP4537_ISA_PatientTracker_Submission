create table HospitalStaff(
    id int not null auto_increment,
    staff_email varchar(100) not null,
    name varchar(30) not null,
    password varchar(100) not null,
    position varchar(30) not null,
    primary key(id)
 );

create table Patient(
    patient_id int not null auto_increment,
    full_name varchar(30) not null,
    sex varchar(10),
    age int,
    weight decimal(5,2),
    patient_condition varchar(200) not null,
    primary key(patient_id)
);

create table Medication(
    medication_id int not null auto_increment,
    name varchar(50),
    primary key(medication_id)
);

create table PatientDosage(
    medication_id int not null,
    patient_id int not null,
    dosage int not null,
    foreign key (medication_id) references Medication(medication_id),
    foreign key (patient_id) references Patient(patient_id),
    primary key (medication_id, patient_id)
);