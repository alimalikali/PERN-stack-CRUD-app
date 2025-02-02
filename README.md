# PERN-stack-CRUD-app
As a JavaScript developer working with Sequelize, an ORM for Node.js, here is a comprehensive list of commonly used Sequelize commands and queries:

### 1. **Initialization**
   - **Install Sequelize and Sequelize CLI**
     ```bash
     npm install sequelize sequelize-cli
     npm install pg pg-hstore # For PostgreSQL
     npm install mysql2       # For MySQL
     npm install sqlite3      # For SQLite
     npm install tedious      # For MSSQL
     ```

   - **Initialize Sequelize (Create Config Files)**
     ```bash
     npx sequelize-cli init
     ```

### 2. **Database Management**
   - **Create a New Database**
     ```bash
     npx sequelize-cli db:create
     ```

   - **Drop a Database**
     ```bash
     npx sequelize-cli db:drop
     ```

### 3. **Model and Migration Management**
   - **Generate a New Model and Migration**
     ```bash
     npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
     ```

   - **Run Migrations**
     ```bash
     npx sequelize-cli db:migrate
     ```

   - **Undo Last Migration**
     ```bash
     npx sequelize-cli db:migrate:undo
     ```

   - **Undo All Migrations**
     ```bash
     npx sequelize-cli db:migrate:undo:all
     ```

### 4. **Seeding Data**
   - **Generate a Seeder**
     ```bash
     npx sequelize-cli seed:generate --name demo-user
     ```

   - **Run Seeders**
     ```bash
     npx sequelize-cli db:seed:all
     ```

   - **Undo Seeders**
     ```bash
     npx sequelize-cli db:seed:undo
     ```

   - **Undo All Seeders**
     ```bash
     npx sequelize-cli db:seed:undo:all
     ```

### 5. **Basic Sequelize Commands in Code**

#### 5.1 **Model Definition**
   ```javascript
   const { DataTypes } = require('sequelize');
   const sequelize = require('./database'); // your sequelize instance

   const User = sequelize.define('User', {
     firstName: {
       type: DataTypes.STRING,
       allowNull: false,
     },
     lastName: {
       type: DataTypes.STRING,
     },
     email: {
       type: DataTypes.STRING,
       unique: true,
       allowNull: false,
     }
   });
   ```

#### 5.2 **Basic CRUD Operations**
   - **Create a Record**
     ```javascript
     const user = await User.create({
       firstName: 'John',
       lastName: 'Doe',
       email: 'john.doe@example.com',
     });
     ```

   - **Find a Single Record**
     ```javascript
     const user = await User.findOne({ where: { email: 'john.doe@example.com' } });
     ```

   - **Find All Records**
     ```javascript
     const users = await User.findAll();
     ```

   - **Update a Record**
     ```javascript
     const updated = await User.update({ lastName: 'Smith' }, {
       where: { email: 'john.doe@example.com' }
     });
     ```

   - **Delete a Record**
     ```javascript
     const deleted = await User.destroy({
       where: { email: 'john.doe@example.com' }
     });
     ```

#### 5.3 **Querying**
   - **Find and Count**
     ```javascript
     const { count, rows } = await User.findAndCountAll({
       where: { firstName: 'John' },
       limit: 10,
       offset: 0,
     });
     ```

   - **Aggregation**
     ```javascript
     const total = await User.count();
     const maxAge = await User.max('age');
     const minAge = await User.min('age');
     const sumSalaries = await User.sum('salary');
     ```

#### 5.4 **Associations**
   - **One-to-One Association**
     ```javascript
     User.hasOne(Profile);
     Profile.belongsTo(User);
     ```

   - **One-to-Many Association**
     ```javascript
     User.hasMany(Post);
     Post.belongsTo(User);
     ```

   - **Many-to-Many Association**
     ```javascript
     User.belongsToMany(Role, { through: 'UserRole' });
     Role.belongsToMany(User, { through: 'UserRole' });
     ```

#### 5.5 **Transactions**
   ```javascript
   const t = await sequelize.transaction();

   try {
     const user = await User.create({
       firstName: 'John',
       lastName: 'Doe',
       email: 'john.doe@example.com',
     }, { transaction: t });

     await t.commit();
   } catch (error) {
     await t.rollback();
   }
   ```

#### 5.6 **Scopes and Paranoid**
   - **Using Scopes**
     ```javascript
     const User = sequelize.define('User', {
       firstName: {
         type: DataTypes.STRING,
         allowNull: false,
       },
       lastName: {
         type: DataTypes.STRING,
       },
       email: {
         type: DataTypes.STRING,
         unique: true,
         allowNull: false,
       }
     }, {
       defaultScope: {
         where: {
           active: true
         }
       },
       scopes: {
         inactive: {
           where: {
             active: false
           }
         }
       }
     });
     ```

   - **Using Paranoid (Soft Deletes)**
     ```javascript
     const User = sequelize.define('User', {
       firstName: {
         type: DataTypes.STRING,
         allowNull: false,
       },
       lastName: {
         type: DataTypes.STRING,
       },
       email: {
         type: DataTypes.STRING,
         unique: true,
         allowNull: false,
       }
     }, {
       paranoid: true
     });
     ```

### 6. **Utility Commands**
   - **Show Current Database**
     ```javascript
     console.log(sequelize.getDatabaseName());
     ```

   - **Check Connection**
     ```javascript
     try {
       await sequelize.authenticate();
       console.log('Connection has been established successfully.');
     } catch (error) {
       console.error('Unable to connect to the database:', error);
     }
     ```

   - **Sync Models with Database**
     ```javascript
     await sequelize.sync(); // Sync all models
     ```

### 7. **Advanced Sequelize Commands**
   - **Eager Loading (Include Related Models)**
     ```javascript
     const userWithPosts = await User.findOne({
       where: { id: userId },
       include: [Post]
     });
     ```

   - **Lazy Loading (Manually Loading Related Models)**
     ```javascript
     const user = await User.findByPk(userId);
     const posts = await user.getPosts();
     ```

   - **Complex Querying with Operators**
     ```javascript
     const { Op } = require('sequelize');
     const users = await User.findAll({
       where: {
         [Op.or]: [
           { firstName: 'John' },
           { lastName: 'Doe' }
         ]
       }
     });
     ```

### 8. **Handling Errors**
   - **Try-Catch Block**
     ```javascript
     try {
       const user = await User.create(data);
     } catch (error) {
       console.error(error);
     }
     ```

   - **Validation Errors**
     ```javascript
     User.create({
       firstName: null, // This will trigger a validation error if firstName is required
     }).catch(error => {
       if (error.name === 'SequelizeValidationError') {
         // Handle validation error
       }
     });
     ```
