CREATE TABLE IF NOT EXISTS bookings (
    id           INT          NOT NULL AUTO_INCREMENT,
    url          VARCHAR(100) NOT NULL,
    scheduled_at TIMESTAMP    NOT NULL,
    status       INT          NOT NULL,
    PRIMARY KEY(id)
);
