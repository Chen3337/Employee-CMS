# Employee-CMS
content management system of Employees in a company
### project links
github : (https://github.com/Chen3337/Employee-CMS.git)
video presentation (https://drive.google.com/file/d/1dwxMgMor6AiQ10Z9Xafmy3muhiixhphc/view)

### project details

have to clone data from "https://github.com/Chen3337/Employee-CMS.git" and install node modules, need mysql workbench for this and change password to "" (nothing) in workbench or enter password in app.js line 22.

add database to workbench using schema.sql

run the app.js using node and it should print EMPLOYEE MANAGEMENT in title and ask what you want to do.

1.view all employees:
    this will show all employees information in a table with name, role, department, salary, and manager name.
2.add employee:
    it will ask four questions first name, last name, role, and manager name, then the new employee is added.
3.remove employee:
    This will give you a list of employee names. choose the name you want to delete.
4.update employee role:
    it will ask you which employee to update, then it will ask you for the new role you want to change it to.
5.update employee's manager:
    it will ask you which employee to update, then it will ask you for the new manager you want to change to it can be null or none.
6.veiw all role:
    this will show all role in a table
7.add role:
    it will ask you to type in the new role name, then it will ask the salary for it (enter a number), choose the department for this role.
8.remove role:
    it will ask you to choose the role you want to delete.
9.add departments:
    it will ask you to enter a new department name.
10.remove department:
    it will ask you to choose the department you want to delete.
11.veiw all department:
    this will show all department in a table.
12.quit:
    this will end the program.



