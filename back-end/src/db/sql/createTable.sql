DROP TABLE IF EXISTS games;

CREATE TABLE games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    picture VARCHAR(255),
    content TEXT NOT NULL,
    subtitle VARCHAR(255),
    created_at DATETIME DEFAULT NOW()
    );
