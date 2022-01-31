const mysql = require('./database').DATABASE;
const create = async () => {
	mysql.execute(
		`CREATE TABLE IF NOT EXISTS activities (id int NOT NULL PRIMARY KEY AUTO_INCREMENT, title varchar(50) NOT NULL, email varchar(50), created_at datetime default NOW(), updated_at datetime default NOW(), deleted_at datetime default null)`,
		() => {
			mysql.execute(
				`CREATE TABLE IF NOT EXISTS todos (is_active tinyint(1) NOT NULL DEFAULT '1', priority enum('very-high','high','normal','low','very-low') NOT NULL DEFAULT 'very-high', id int NOT NULL PRIMARY KEY AUTO_INCREMENT, activity_group_id int NOT NULL, title varchar(50) NOT NULL, created_at datetime default NOW() , updated_at datetime default NOW() ,deleted_at datetime default null, FOREIGN KEY (activity_group_id) REFERENCES activities(id))`
			);
		}
	);

	// new Promise(() => {
	// 	mysql.execute(
	// 		`CREATE TABLE IF NOT EXISTS activities (id int NOT NULL PRIMARY KEY AUTO_INCREMENT, title varchar(50) NOT NULL, email varchar(50), created_at datetime default NOW(), updated_at datetime default NOW(), deleted_at datetime default null)`
	// 	)
	// 		.then(() => {
	// 			mysql.execute(
	// 				`CREATE TABLE IF NOT EXISTS todos (is_active tinyint(1) NOT NULL DEFAULT '1', priority enum('very-high','high','normal','low','very-low') NOT NULL DEFAULT 'very-high', id int NOT NULL PRIMARY KEY AUTO_INCREMENT, activity_group_id int NOT NULL, title varchar(50) NOT NULL, created_at datetime default NOW() , updated_at datetime default NOW() ,deleted_at datetime default null, FOREIGN KEY (activity_group_id) REFERENCES activities(id))`
	// 			);
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// });
};
create();
