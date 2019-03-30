
-- AUTHOR: BOGDAN MAIER
-- COM.CRISSTUDIO

-- ROLES

CREATE TABLE IF NOT EXISTS ROLES (
    ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(128) NOT NULL
);

-- USERS

CREATE TABLE IF NOT EXISTS USERS (
    ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    EMAIL VARCHAR(128) NOT NULL,
    PASSWORD VARCHAR(1024) NOT NULL,

    CREATED_DATE DATE NOT NULL,

    FIRST_NAME VARCHAR(64) NOT NULL,
    LAST_NAME VARCHAR(64) NOT NULL,
    PHONE VARCHAR(10) NOT NULL,

    COUNTRY VARCHAR(128) NOT NULL, 
    REGION VARCHAR(128) NOT NULL,
    CITY VARCHAR(128) NOT NULL,
    STREET VARCHAR(128) NOT NULL,

    FK_ROLE INT UNSIGNED NOT NULL,
    FOREIGN KEY (FK_ROLE) REFERENCES ROLES (ID)
);

-- ORDER

CREATE TABLE IF NOT EXISTS DIMENSIUNI_COPERTA (
    ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    DIMENSIUNI VARCHAR(24)
);

CREATE TABLE IF NOT EXISTS MATERIALE_COPERTA (
    ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    NUME VARCHAR(64) NOT NULL,
    DESCRIERE VARCHAR(2048),
    IMAGINE VARCHAR(2048)
);

CREATE TABLE IF NOT EXISTS TIP_COPERTA (
    ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    NUME VARCHAR(64) NOT NULL,
    DESCRIERE VARCHAR(2048),
    IMAGINE VARCHAR(2048)
);

CREATE TABLE IF NOT EXISTS ORDER_ALBUM (
    ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    DATA_PLASARE DATETIME NOT NULL,
    DATA_TERMINARE DATETIME,

    TEXT_COPERTA VARCHAR (256) NOT NULL,
    NUMAR_COLAJE INT UNSIGNED NOT NULL,
    NUMAR_ALBUME INT UNSIGNED NOT NULL,
    LINK_POZE VARCHAR (1024) NOT NULL,

    CUTIE_ALBUM VARCHAR (4) NOT NULL,
    FACE_OFF VARCHAR (4) NOT NULL,
    COPERTA_BURETATA VARCHAR (4) NOT NULL,
    COLTARE_METAL VARCHAR (4) NOT NULL,
    PASPARTOU VARCHAR (4) NOT NULL,
    MACHETARE VARCHAR (4) NOT NULL,

    MATERIAL_TABLOU VARCHAR (64),
    DIMENSIUNE_TABLOU VARCHAR (64),
    NUMAR_TABLOURI INT UNSIGNED,

    CUTIE_STICK VARCHAR (4),
    MAPA_STICK VARCHAR (4),
    NUMAR_CUTII_STICK INT UNSIGNED,
    NUMAR_MAPE_STICK INT UNSIGNED,

    FK_DIMENSIUNI_COPERTA INT UNSIGNED NOT NULL,
    FK_MATERIAL_COPERTA INT UNSIGNED NOT NULL,
    FK_TIP_COPERTA INT UNSIGNED NOT NULL,

    MENTIUNI VARCHAR (2048),

    FOREIGN KEY (FK_DIMENSIUNI_COPERTA) REFERENCES DIMENSIUNI_COPERTA (ID),
    FOREIGN KEY (FK_MATERIAL_COPERTA) REFERENCES MATERIALE_COPERTA (ID),
    FOREIGN KEY (FK_TIP_COPERTA) REFERENCES TIP_COPERTA (ID),

    FK_USER INT UNSIGNED NOT NULL,
    FOREIGN KEY (FK_USER) REFERENCES USERS (ID)
);