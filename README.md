## Payload CMS API demo project
- **Database**: postgreSQL
- **Storage Adapter**: localDisk
  
### **Users and authentication**

Users collection should be able to authenticate via JWT.


### **User Roles**
Admins and regular users, in which admin can access all tasks and users can access only their own ones.

### **Tasks**

The task collection should have the following fields.
- Title 
- Description (rich text, optional).
- Due Date 
- Assignee (relation to users).
- Status (enum: “To Do”, “In Progress”, “Done”).


## [API Docs](https://documenter.getpostman.com/view/36668209/2sAYdZsYQF#intro)


