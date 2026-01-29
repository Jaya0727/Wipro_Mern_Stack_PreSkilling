create database eflyer;
use eflyer;
CREATE TABLE product (
  product_id INT PRIMARY KEY,
  product_name VARCHAR(50),
  category VARCHAR(30),
  price INT,
  quantity INT
);
INSERT INTO product VALUES
(1, 'T-Shirt', 'Clothing', 499, 10),
(2, 'Shirt', 'Clothing', 799, 5),
(3, 'Shoes', 'Footwear', 1999, 3);
Select * from product;
show tables;
update product set product_name = 'Skirt',category = "Women Clothing" where product_id = 3;
select * from products;
delete from product where product_id = 1;
Insert into product values(1, 'Mobile', 'Gadget', 19999, 1);
rename table product to products;
select * from products where price >= 1999;
Alter table products drop column quantity;
alter table products add column quantity int after price;
Insert into products (quantity) values (2,4,1,2);