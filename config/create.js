const mysql = require('./database').DATABASE;
const migration = {
	create: async () => {
		// const connection = await mysql.getConnection();
		await mysql.execute(
			`CREATE TABLE IF NOT EXISTS activities (id int NOT NULL PRIMARY KEY AUTO_INCREMENT, title varchar(20) NOT NULL, email varchar(50), created_at datetime default NOW(), updated_at datetime default NOW(), deleted_at datetime default null)`
		);
		await mysql.execute(
			`CREATE TABLE IF NOT EXISTS todos (is_active tinyint(1) NOT NULL DEFAULT '1', priority enum('very-high','high','normal','low','very-low') NOT NULL DEFAULT 'very-high', id int NOT NULL PRIMARY KEY AUTO_INCREMENT, activity_group_id int NOT NULL, title varchar(30) NOT NULL, created_at datetime default NOW() , updated_at datetime default NOW() ,deleted_at datetime default null, 
            FOREIGN KEY (activity_group_id) REFERENCES activities(id))`
		);
	},
};

module.exports = migration;
