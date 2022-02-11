CREATE TABLE products(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    availability INTEGER NOT NULL,
    picture TEXT NOT NULL
);

CREATE TABLE users(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE orders(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE orders_products(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY(order_id) REFERENCES orders(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
);

CREATE TABLE messages(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL
);

INSERT INTO products (name, price, availability, picture)
VALUES (
        'Horno multifunción pirolítico WHIRLPOOL AKZ9797IX inox antihuellas 73L clase A+',
        377,
        1,
        'https://assets.leroymerlin.es/is/image/lmes/82395296-0100/horno-pirolitico-whirlpool-akz9-797-ix.png'
    );

INSERT INTO products (name, price, availability, picture)
VALUES (
        'Frigorífico combi WHIRLPOOL W7 921I OX clase E',
        681,
        1,
        'https://assets.leroymerlin.es/is/image/lmes/82482389-0100/combi-whirlpool-w7-921i-ox.jpg'
    );

INSERT INTO products (name, price, availability, picture)
VALUES (
        'Lavadora EDESA de 8kg EWF-1481 WH clase E',
        294.30,
        0,
        'https://assets.leroymerlin.es/is/image/lmes/83825038-0100/lavadora-8kg-edesa-ewf-1481-wh.jpg'
    );

INSERT INTO products (name, price, availability, picture)
VALUES (
        'Lavavajillas WHIRLPOOL WRIC 3C26 59,5 cm de ancho clase E',
        501,
        1,
        'https://assets.leroymerlin.es/is/image/lmes/82482398-0100/lavavajillas-int-60-whirlpool-wric-3c26.jpg'
    );

INSERT INTO products (name, price, availability, picture)
VALUES (
        'Horno WHIRLPOOL AKP 785 IX multifunción A 65 litros 3.2kW Aqualisis',
        305,
        1,
        'https://assets.leroymerlin.es/is/image/lmes/81874840-0100/horno-whirlpool-akp-785-ix-smart-clean.jpg'
    );

INSERT INTO products (name, price, availability, picture)
VALUES (
        'Inducción CATA ILM3280 con 3 zonas de cocción 7100 W',
        269,
        1,
        'https://assets.leroymerlin.es/is/image/lmes/82341539-0100/placa-ind-ilm3280-fuego-28cm.png'
    );

INSERT INTO products (name, price, availability, picture)
VALUES (
        'Grupo filtrante GH 45 Cata de 790 m³/h Inox clase A',
        171,
        0,
        'https://assets.leroymerlin.es/is/image/lmes/82051805-0100/campana-gf-cata-gh-45-x-inox.png'
    );

INSERT INTO products (name, price, availability, picture)
VALUES (
        'Campana extractora CONTROL AIR BH 900 inox de 850 m³/h plata clase A',
        279,
        1,
        'https://assets.leroymerlin.es/is/image/lmes/82051808-0100/campana-t-inv-controlair-bh-900-inox.png'
    );

INSERT INTO products (name, price, availability, picture)
VALUES (
        'Horno multifunción CATA MHD 705 bk 50 litros negro clase A+',
        224.10,
        0,
        'https://assets.leroymerlin.es/is/image/lmes/18898061-0100/horno-multi-aqua-mhd-705-bk-cata.jpg'
    );

INSERT INTO products (name, price, availability, picture)
VALUES (
        'Lavadora ELECTROLUX EW7F4722NF 7 kg clase D',
        504.90,
        1,
        'https://assets.leroymerlin.es/is/image/lmes/81971611-0100/lavd-int-7-12-electrolux-ew7f4722nf.png'
    );

INSERT INTO products (name, price, availability, picture)
VALUES (
        'Campana extractora Thunder TURBOAIR cristal de 757 m³/h negro clase B',
        303,
        0,
        'https://assets.leroymerlin.es/is/image/lmes/82410289-0100/campana-thunder-bl-a-60-lx.jpg'
    );