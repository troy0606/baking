-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 
-- 伺服器版本： 10.3.16-MariaDB
-- PHP 版本： 7.1.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `baking_shop`
--

-- --------------------------------------------------------

--
-- 資料表結構 `cart`
--

CREATE TABLE `cart` (
  `cart_sid` int(11) NOT NULL COMMENT '購物車流水號',
  `member_sid` int(11) DEFAULT NULL COMMENT '會員流水號',
  `product_sid` int(11) DEFAULT NULL COMMENT '產品流水號',
  `product_quantity` int(11) DEFAULT NULL COMMENT '產品數量'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 資料表結構 `order`
--

CREATE TABLE `order` (
  `order_sid` int(11) NOT NULL COMMENT '訂單流水號',
  `member_sid` int(11) DEFAULT NULL COMMENT '會員流水號',
  `coupon_sid` int(11) DEFAULT NULL COMMENT '折價卷流水號',
  `order_total_price` int(11) DEFAULT NULL COMMENT '訂單總價',
  `member_used_bonus` int(11) DEFAULT NULL COMMENT '使用紅利',
  `order_create_time` datetime DEFAULT current_timestamp() COMMENT '訂單新增時間'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 資料表結構 `product`
--

CREATE TABLE `product` (
  `product_sid` int(11) NOT NULL COMMENT '產品流水號',
  `product_name` varchar(255) DEFAULT NULL COMMENT '產品名稱',
  `product_img_1` varchar(255) DEFAULT NULL COMMENT '產品照片',
  `product_price` int(11) DEFAULT NULL COMMENT '產品價格',
  `product_detail` varchar(255) DEFAULT NULL COMMENT '產品詳細資訊',
  `product_category` int(11) DEFAULT NULL COMMENT '產品種類'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 資料表結構 `product_order`
--

CREATE TABLE `product_order` (
  `product_order_sid` int(11) NOT NULL COMMENT '產品訂單流水號',
  `product_order_quantity` int(11) DEFAULT NULL COMMENT '產品數量',
  `product_sid` int(11) DEFAULT NULL COMMENT '產品流水號',
  `order_sid` int(11) DEFAULT NULL COMMENT '訂單流水號'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_sid`);

--
-- 資料表索引 `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`order_sid`);

--
-- 資料表索引 `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_sid`);

--
-- 資料表索引 `product_order`
--
ALTER TABLE `product_order`
  ADD PRIMARY KEY (`product_order_sid`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_sid` int(11) NOT NULL AUTO_INCREMENT COMMENT '購物車流水號';

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `order`
--
ALTER TABLE `order`
  MODIFY `order_sid` int(11) NOT NULL AUTO_INCREMENT COMMENT '訂單流水號';

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `product`
--
ALTER TABLE `product`
  MODIFY `product_sid` int(11) NOT NULL AUTO_INCREMENT COMMENT '產品流水號';

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `product_order`
--
ALTER TABLE `product_order`
  MODIFY `product_order_sid` int(11) NOT NULL AUTO_INCREMENT COMMENT '產品訂單流水號';
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
