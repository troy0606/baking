-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 
-- 伺服器版本： 10.4.10-MariaDB
-- PHP 版本： 7.3.12

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

--
-- 傾印資料表的資料 `cart`
--

INSERT INTO `cart` (`cart_sid`, `member_sid`, `product_sid`, `product_quantity`) VALUES
(323, 2, 2, 1),
(343, 1, 2, 18),
(344, 1, 3, 4),
(345, 1, 5, 20),
(346, 1, 8, 1);

-- --------------------------------------------------------

--
-- 資料表結構 `coupon`
--

CREATE TABLE `coupon` (
  `coupon_sid` int(11) NOT NULL COMMENT '優惠卷流水號',
  `coupon_number` int(11) DEFAULT NULL COMMENT '優惠卷輸入號碼',
  `coupon_detail` varchar(255) CHARACTER SET utf16le DEFAULT NULL COMMENT '優惠活動內容',
  `coupon_bonus` float DEFAULT NULL COMMENT '優惠折扣',
  `coupon_limit` int(11) NOT NULL DEFAULT 0 COMMENT '折扣限制',
  `coupon_create_time` datetime NOT NULL DEFAULT current_timestamp() COMMENT '優惠卷新增時間',
  `coupon_price_percent` float DEFAULT NULL COMMENT '浮點數折扣'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `coupon`
--

INSERT INTO `coupon` (`coupon_sid`, `coupon_number`, `coupon_detail`, `coupon_bonus`, `coupon_limit`, `coupon_create_time`, `coupon_price_percent`) VALUES
(1, 111, '現金折抵', 50, 0, '2019-12-22 10:07:51', NULL),
(2, 222, '免運折扣', 60, 0, '2019-12-22 10:07:51', NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `member`
--

CREATE TABLE `member` (
  `member_sid` int(11) NOT NULL COMMENT '會員編號',
  `member_email` text NOT NULL DEFAULT '' COMMENT '會員信箱/帳號',
  `member_password` text NOT NULL DEFAULT '' COMMENT '會員密碼',
  `member_name` text NOT NULL DEFAULT '' COMMENT '會員名稱',
  `member_birth` date NOT NULL DEFAULT current_timestamp() COMMENT '會員生日',
  `member_phone` text NOT NULL DEFAULT '' COMMENT '會員電話',
  `member_address` text NOT NULL DEFAULT '' COMMENT '會員住址',
  `member_bonus` int(11) NOT NULL DEFAULT 0 COMMENT '會員紅利',
  `member_create` datetime NOT NULL DEFAULT current_timestamp() COMMENT '會員創建時間',
  `member_level` int(11) NOT NULL DEFAULT 1 COMMENT '會員等級',
  `member_picture` text NOT NULL DEFAULT '' COMMENT '會員頭像'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='會員表';

--
-- 傾印資料表的資料 `member`
--

INSERT INTO `member` (`member_sid`, `member_email`, `member_password`, `member_name`, `member_birth`, `member_phone`, `member_address`, `member_bonus`, `member_create`, `member_level`, `member_picture`) VALUES
(1, 'z27089433@gmail.com', 'z27089433', 'jason', '2019-12-16', '', '', 400, '2019-12-16 09:02:16', 1, '1565267046-948161041_n.jpg'),
(2, 'z270894333@gmail.com', 'z270894333', 'jason2', '2019-12-23', '', '', 0, '2019-12-23 09:54:18', 1, '');

-- --------------------------------------------------------

--
-- 資料表結構 `member_coupon`
--

CREATE TABLE `member_coupon` (
  `member_coupon_sid` int(11) NOT NULL COMMENT '會員優惠卷流水號',
  `member_sid` int(11) DEFAULT NULL COMMENT '會員編號',
  `coupon_sid` int(11) DEFAULT NULL COMMENT '優惠卷編號',
  `member_coupon_used` int(11) DEFAULT 0 COMMENT '是否使用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `member_coupon`
--

INSERT INTO `member_coupon` (`member_coupon_sid`, `member_sid`, `coupon_sid`, `member_coupon_used`) VALUES
(6, 1, 1, 0),
(7, 1, 2, 0);

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
  `product_name` varchar(255) CHARACTER SET utf16 DEFAULT NULL COMMENT '產品名稱',
  `product_img_1` varchar(255) CHARACTER SET utf16 DEFAULT NULL COMMENT '產品照片',
  `product_price` int(11) DEFAULT NULL COMMENT '產品價格',
  `product_detail` varchar(255) CHARACTER SET utf16 DEFAULT NULL COMMENT '產品詳細資訊',
  `product_category` int(11) DEFAULT NULL COMMENT '產品種類'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 傾印資料表的資料 `product`
--

INSERT INTO `product` (`product_sid`, `product_name`, `product_img_1`, `product_price`, `product_detail`, `product_category`) VALUES
(1, '木木甜心', '木木甜心s.png', 400, 'aaa', 1),
(2, '戀戀奶香芋泥千層', '戀戀奶香芋泥千層s.png', 500, 'aaa', 2),
(3, '抹茶泡芙', '抹茶泡芙s.png', 700, 'aaa', 3),
(4, '抹茶千層蛋糕', '抹茶千層蛋糕s.png', 700, 'aaa', 1),
(5, '黑糖桂圓千層', '黑糖桂圓千層s.png', 700, 'aaa', 2),
(6, '黑白配千層', '黑白配千層s.png', 700, 'aaa', 2),
(7, '黑爵士千層蛋糕罐', '黑爵士千層蛋糕罐s.png', 700, 'aaa', 5),
(8, '黑爵士', '黑爵士s.png', 700, 'aaa', 1),
(9, '髒髒泡芙', '髒髒泡芙s.png', 700, 'aaa', 3),
(10, '金沙起士千層', '金沙起士千層s.png', 700, 'aaa', 2),
(11, '金桔檸檬千層', '金桔檸檬千層s.png', 700, 'aaa', 2),
(12, '蜂蜜千層', '蜂蜜千層s.png', 700, 'aaa', 2),
(13, '蜂巢蛋糕', '蜂巢蛋糕s.png', 700, 'aaa', 1),
(14, '藍莓生乳千層蛋糕', '藍莓生乳千層蛋糕s.png', 700, 'aaa', 2),
(15, '莓果布雷斯特泡芙', '莓果布雷斯特泡芙s.png', 700, 'aaa', 3),
(16, '百香果千層', '百香果千層s.png', 700, 'aaa', 2),
(17, '法式香草千層蛋糕', '法式香草千層蛋糕s.png', 700, 'aaa', 2),
(18, '法式香濃巧克力捲', '法式香濃巧克力捲s.png', 700, 'aaa', 4),
(19, '提拉米蘇千層蛋糕', '提拉米蘇千層蛋糕s.png', 700, 'aaa', 1),
(20, '巧克力千層蛋糕', '巧克力千層蛋糕s.png', 700, 'aaa', 2),
(21, '奶香芋泥捲', '奶香芋泥捲s.png', 700, 'aaa', 4),
(22, '愛戀絮語', '愛戀絮語s.png', 700, 'aaa', 5),
(23, '美麗家園', '美麗家園s.png', 700, 'aaa', 1),
(24, '黑巧克力多肉植物', '黑巧克力多肉植物s.png', 700, 'aaa', 5);

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
-- 資料表索引 `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`coupon_sid`);

--
-- 資料表索引 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`member_sid`);

--
-- 資料表索引 `member_coupon`
--
ALTER TABLE `member_coupon`
  ADD PRIMARY KEY (`member_coupon_sid`);

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
  MODIFY `cart_sid` int(11) NOT NULL AUTO_INCREMENT COMMENT '購物車流水號', AUTO_INCREMENT=347;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `coupon`
--
ALTER TABLE `coupon`
  MODIFY `coupon_sid` int(11) NOT NULL AUTO_INCREMENT COMMENT '優惠卷流水號', AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `member`
--
ALTER TABLE `member`
  MODIFY `member_sid` int(11) NOT NULL AUTO_INCREMENT COMMENT '會員編號', AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `member_coupon`
--
ALTER TABLE `member_coupon`
  MODIFY `member_coupon_sid` int(11) NOT NULL AUTO_INCREMENT COMMENT '會員優惠卷流水號', AUTO_INCREMENT=8;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `order`
--
ALTER TABLE `order`
  MODIFY `order_sid` int(11) NOT NULL AUTO_INCREMENT COMMENT '訂單流水號';

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `product`
--
ALTER TABLE `product`
  MODIFY `product_sid` int(11) NOT NULL AUTO_INCREMENT COMMENT '產品流水號', AUTO_INCREMENT=26;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `product_order`
--
ALTER TABLE `product_order`
  MODIFY `product_order_sid` int(11) NOT NULL AUTO_INCREMENT COMMENT '產品訂單流水號';
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
