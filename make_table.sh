#!/bin/bash

export PGPASSWORD=123

psql --file=commands.txt -h localhost -U kena -p 5433 -d notes_database_2

#echo "delete from notes_administration_users;" | psql -h localhost -U kena -p 5433 -d notes_database_2
#echo "insert into notes_administration_users values 
#('lena', 'lena@lena.lena', 1);" | psql -h localhost -U kena -p 5433 -d notes_database_2
#echo "insert into notes_administration_users values 
#('ira', 'ira@lena.lena', 2);" | psql -h localhost -U kena -p 5433 -d notes_database_2
#echo "select * from notes_administration_users;" | psql -h localhost -U kena -p 5433 -d notes_database_2

#echo "delete from notes_administration_note;" | psql -h localhost -U kena -p 5433 -d notes_database_2
#echo "insert into notes_administration_note values 
#('good', 'iraa', 1, 2);" | psql -h localhost -U kena -p 5433 -d notes_database_2
#echo "select * from notes_administration_note;" | psql -h localhost -U kena -p 5433 -d notes_database_2

