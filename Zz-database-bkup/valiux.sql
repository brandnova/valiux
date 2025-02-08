-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 05, 2024 at 10:40 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `valiux`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts_profile`
--

CREATE TABLE `accounts_profile` (
  `id` bigint(20) NOT NULL,
  `bio` longtext DEFAULT NULL,
  `avatar` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts_profile`
--

INSERT INTO `accounts_profile` (`id`, `bio`, `avatar`, `phone`, `user_id`) VALUES
(1, 'Cool coder', 'profile_images/head-shot.jpg', '08141941192', 1);

-- --------------------------------------------------------

--
-- Table structure for table `ads_ad`
--

CREATE TABLE `ads_ad` (
  `id` bigint(20) NOT NULL,
  `code` longtext NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `active` tinyint(1) NOT NULL,
  `location` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ads_ad`
--

INSERT INTO `ads_ad` (`id`, `code`, `start_date`, `end_date`, `active`, `location`) VALUES
(1, '<section class=\"d-flex flex-column justify-content-center align-items-center\">\r\n        <div class=\"d-inline-block p-2 rounded text-primary border-start border-warning-subtle bg-info-subtle border-2 bg-opacity-50 border-start border-3 border-dark container\">\r\n            <h3>Ad!</h3>\r\n            <p>This is an ad location</p>\r\n        </div>\r\n    </section>', '2024-08-12', '2024-08-31', 1, 'homepage_top');

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add site settings', 7, 'add_sitesettings'),
(26, 'Can change site settings', 7, 'change_sitesettings'),
(27, 'Can delete site settings', 7, 'delete_sitesettings'),
(28, 'Can view site settings', 7, 'view_sitesettings'),
(29, 'Can add static page', 8, 'add_staticpage'),
(30, 'Can change static page', 8, 'change_staticpage'),
(31, 'Can delete static page', 8, 'delete_staticpage'),
(32, 'Can view static page', 8, 'view_staticpage'),
(33, 'Can add ad', 9, 'add_ad'),
(34, 'Can change ad', 9, 'change_ad'),
(35, 'Can delete ad', 9, 'delete_ad'),
(36, 'Can view ad', 9, 'view_ad'),
(37, 'Can add social media link', 10, 'add_socialmedialink'),
(38, 'Can change social media link', 10, 'change_socialmedialink'),
(39, 'Can delete social media link', 10, 'delete_socialmedialink'),
(40, 'Can view social media link', 10, 'view_socialmedialink'),
(41, 'Can add profile', 11, 'add_profile'),
(42, 'Can change profile', 11, 'change_profile'),
(43, 'Can delete profile', 11, 'delete_profile'),
(44, 'Can view profile', 11, 'view_profile'),
(45, 'Can add tag', 12, 'add_tag'),
(46, 'Can change tag', 12, 'change_tag'),
(47, 'Can delete tag', 12, 'delete_tag'),
(48, 'Can view tag', 12, 'view_tag'),
(49, 'Can add tagged item', 13, 'add_taggeditem'),
(50, 'Can change tagged item', 13, 'change_taggeditem'),
(51, 'Can delete tagged item', 13, 'delete_taggeditem'),
(52, 'Can view tagged item', 13, 'view_taggeditem'),
(53, 'Can add category', 14, 'add_category'),
(54, 'Can change category', 14, 'change_category'),
(55, 'Can delete category', 14, 'delete_category'),
(56, 'Can view category', 14, 'view_category'),
(57, 'Can add post', 15, 'add_post'),
(58, 'Can change post', 15, 'change_post'),
(59, 'Can delete post', 15, 'delete_post'),
(60, 'Can view post', 15, 'view_post'),
(61, 'Can add comment', 16, 'add_comment'),
(62, 'Can change comment', 16, 'change_comment'),
(63, 'Can delete comment', 16, 'delete_comment'),
(64, 'Can view comment', 16, 'view_comment'),
(65, 'Can add bookmark', 17, 'add_bookmark'),
(66, 'Can change bookmark', 17, 'change_bookmark'),
(67, 'Can delete bookmark', 17, 'delete_bookmark'),
(68, 'Can view bookmark', 17, 'view_bookmark'),
(69, 'Can add reaction', 18, 'add_reaction'),
(70, 'Can change reaction', 18, 'change_reaction'),
(71, 'Can delete reaction', 18, 'delete_reaction'),
(72, 'Can view reaction', 18, 'view_reaction');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_user`
--

INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`) VALUES
(1, 'pbkdf2_sha256$720000$uBXc4wmjR9jXoAyTP5VfVl$8kdQkf8VSkWoB/kv8zuN9saBOG13RBtFVZ9Zj7xRMnI=', '2024-08-21 08:27:08.000000', 1, 'admin', 'Mr', 'Nova', 'nova@gmail.com', 1, 1, '2024-08-12 23:18:32.000000');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `core_sitesettings`
--

CREATE TABLE `core_sitesettings` (
  `id` bigint(20) NOT NULL,
  `site_name` varchar(100) NOT NULL,
  `site_description` longtext NOT NULL,
  `favicon` varchar(100) DEFAULT NULL,
  `logo` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contact_email` varchar(254) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `meta_keywords` varchar(255) NOT NULL,
  `meta_description` varchar(255) NOT NULL,
  `meta_author` varchar(100) NOT NULL,
  `og_title` varchar(255) NOT NULL,
  `og_description` varchar(255) NOT NULL,
  `og_image` varchar(100) DEFAULT NULL,
  `og_url` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `core_sitesettings`
--

INSERT INTO `core_sitesettings` (`id`, `site_name`, `site_description`, `favicon`, `logo`, `address`, `contact_email`, `phone_number`, `meta_keywords`, `meta_description`, `meta_author`, `og_title`, `og_description`, `og_image`, `og_url`) VALUES
(1, 'Valiux', 'Get tons of online readable content on Valiux', 'Site_images/valiux-removebg-preview-removebg-preview.png', 'Site_images/valiux-removebg-preview-removebg-preview_96Yha2o.png', 'No 23 abc road behind 123 building', 'mail@valiux.com', '+1 (555) 123-4567', 'Valiux, Summaries', 'Get contents online', 'Mr Nova', 'Valiux', 'Online contents', 'meta_images/valiux.png', 'https://valiux.com');

-- --------------------------------------------------------

--
-- Table structure for table `core_sitesettings_social_media_links`
--

CREATE TABLE `core_sitesettings_social_media_links` (
  `id` bigint(20) NOT NULL,
  `sitesettings_id` bigint(20) NOT NULL,
  `socialmedialink_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `core_sitesettings_social_media_links`
--

INSERT INTO `core_sitesettings_social_media_links` (`id`, `sitesettings_id`, `socialmedialink_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `core_socialmedialink`
--

CREATE TABLE `core_socialmedialink` (
  `id` bigint(20) NOT NULL,
  `platform` varchar(20) NOT NULL,
  `url` varchar(200) NOT NULL,
  `icon_class` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `core_socialmedialink`
--

INSERT INTO `core_socialmedialink` (`id`, `platform`, `url`, `icon_class`) VALUES
(1, 'Facebook', 'https://fb.com', 'facebook'),
(2, 'Twitter (X)', 'https://x.com', 'twitter-x'),
(3, 'Instagram', 'https://instagram.com', 'instagram');

-- --------------------------------------------------------

--
-- Table structure for table `core_staticpage`
--

CREATE TABLE `core_staticpage` (
  `id` bigint(20) NOT NULL,
  `title` varchar(200) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `content` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_admin_log`
--

INSERT INTO `django_admin_log` (`id`, `action_time`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`) VALUES
(1, '2024-08-12 23:34:50.528294', '1', 'Valiux', 1, '[{\"added\": {}}]', 7, 1),
(2, '2024-08-12 23:53:56.103288', '1', 'Ad for homepage_top (Active: True)', 1, '[{\"added\": {}}]', 9, 1),
(3, '2024-08-13 00:00:19.499973', '1', 'Ad for homepage_top (Active: True)', 2, '[{\"changed\": {\"fields\": [\"Code\"]}}]', 9, 1),
(4, '2024-08-14 17:02:49.052777', '1', 'Facebook', 1, '[{\"added\": {}}]', 10, 1),
(5, '2024-08-14 17:03:56.422429', '2', 'Twitter (X)', 1, '[{\"added\": {}}]', 10, 1),
(6, '2024-08-14 17:04:18.371182', '3', 'Instagram', 1, '[{\"added\": {}}]', 10, 1),
(7, '2024-08-14 17:08:23.745781', '1', 'Valiux', 2, '[{\"changed\": {\"fields\": [\"Social media links\"]}}]', 7, 1),
(8, '2024-08-14 20:07:01.473922', '1', 'admin Profile', 1, '[{\"added\": {}}]', 11, 1),
(9, '2024-08-20 20:40:50.739480', '1', 'Short Stories', 1, '[{\"added\": {}}]', 14, 1),
(10, '2024-08-20 20:41:44.839338', '1', 'New Post To check template', 1, '[{\"added\": {}}]', 15, 1),
(11, '2024-08-20 21:23:22.303259', '2', 'Another new one', 1, '[{\"added\": {}}]', 15, 1),
(12, '2024-08-20 21:23:37.584910', '2', 'Another new one', 2, '[{\"changed\": {\"fields\": [\"Status\"]}}]', 15, 1),
(13, '2024-08-21 07:31:45.270538', '1', 'New Post To check template', 2, '[{\"changed\": {\"fields\": [\"Content\"]}}]', 15, 1),
(14, '2024-08-21 07:57:52.375865', '1', 'New Post To check template', 2, '[]', 15, 1),
(15, '2024-08-21 10:06:55.459797', '1', 'admin', 2, '[{\"changed\": {\"fields\": [\"First name\", \"Last name\", \"Email address\"]}}]', 4, 1),
(16, '2024-08-21 10:12:43.262209', '1', 'New Post To check template', 2, '[{\"changed\": {\"fields\": [\"Published date\"]}}]', 15, 1),
(17, '2024-08-21 10:12:50.280407', '2', 'Another new one', 2, '[{\"changed\": {\"fields\": [\"Published date\"]}}]', 15, 1);

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(11, 'accounts', 'profile'),
(1, 'admin', 'logentry'),
(9, 'ads', 'ad'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(5, 'contenttypes', 'contenttype'),
(7, 'core', 'sitesettings'),
(10, 'core', 'socialmedialink'),
(8, 'core', 'staticpage'),
(17, 'posts', 'bookmark'),
(14, 'posts', 'category'),
(16, 'posts', 'comment'),
(15, 'posts', 'post'),
(18, 'posts', 'reaction'),
(6, 'sessions', 'session'),
(12, 'taggit', 'tag'),
(13, 'taggit', 'taggeditem');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2024-08-12 23:12:36.687970'),
(2, 'auth', '0001_initial', '2024-08-12 23:12:36.741360'),
(3, 'admin', '0001_initial', '2024-08-12 23:12:36.793115'),
(4, 'admin', '0002_logentry_remove_auto_add', '2024-08-12 23:12:36.823511'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2024-08-12 23:12:36.843304'),
(6, 'contenttypes', '0002_remove_content_type_name', '2024-08-12 23:12:36.956019'),
(7, 'auth', '0002_alter_permission_name_max_length', '2024-08-12 23:12:36.977264'),
(8, 'auth', '0003_alter_user_email_max_length', '2024-08-12 23:12:37.006326'),
(9, 'auth', '0004_alter_user_username_opts', '2024-08-12 23:12:37.082475'),
(10, 'auth', '0005_alter_user_last_login_null', '2024-08-12 23:12:37.126766'),
(11, 'auth', '0006_require_contenttypes_0002', '2024-08-12 23:12:37.139125'),
(12, 'auth', '0007_alter_validators_add_error_messages', '2024-08-12 23:12:37.166541'),
(13, 'auth', '0008_alter_user_username_max_length', '2024-08-12 23:12:37.195067'),
(14, 'auth', '0009_alter_user_last_name_max_length', '2024-08-12 23:12:37.222694'),
(15, 'auth', '0010_alter_group_name_max_length', '2024-08-12 23:12:37.267009'),
(16, 'auth', '0011_update_proxy_permissions', '2024-08-12 23:12:37.290295'),
(17, 'auth', '0012_alter_user_first_name_max_length', '2024-08-12 23:12:37.333997'),
(18, 'core', '0001_initial', '2024-08-12 23:12:37.351584'),
(19, 'sessions', '0001_initial', '2024-08-12 23:12:37.363427'),
(20, 'ads', '0001_initial', '2024-08-12 23:18:07.363185'),
(21, 'core', '0002_socialmedialink_sitesettings_social_media_links', '2024-08-14 17:01:46.481781'),
(22, 'accounts', '0001_initial', '2024-08-14 20:04:56.781558'),
(23, 'taggit', '0001_initial', '2024-08-20 16:20:40.746704'),
(24, 'taggit', '0002_auto_20150616_2121', '2024-08-20 16:20:40.768800'),
(25, 'taggit', '0003_taggeditem_add_unique_index', '2024-08-20 16:20:40.816540'),
(26, 'taggit', '0004_alter_taggeditem_content_type_alter_taggeditem_tag', '2024-08-20 16:20:40.863310'),
(27, 'taggit', '0005_auto_20220424_2025', '2024-08-20 16:20:40.893405'),
(28, 'taggit', '0006_rename_taggeditem_content_type_object_id_taggit_tagg_content_8fc721_idx', '2024-08-20 16:20:40.961217'),
(29, 'posts', '0001_initial', '2024-08-20 16:20:41.095598'),
(30, 'posts', '0002_comment_parent', '2024-08-20 17:22:01.554756'),
(31, 'posts', '0003_rename_article_bookmark_post_and_more', '2024-08-20 17:28:29.541960');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('62eflqcav6rntayofytg97trq7kgvvtb', '.eJxVjDsOwyAQRO9CHSE-axAp0-cMaDG7wUkEkrErK3ePkFwk5cx7M4eIuG8l7p3WuGRxFVpcfruE84vqAPmJ9dHk3Oq2LkkORZ60y3vL9L6d7t9BwV7GOgVSDsEyEwP6HDx7A2lSzmhjJ2aFlGc0ASwlR8AKMo-swLBO4vMFBTc4tw:1seGUT:yhCu-UglTIOchL3fSPrGTzpDcklXtgn7_I1aIOtJwXU', '2024-08-28 16:04:49.512406'),
('ffhrzbhses1d2c8sub2o6a4xyqd6lyef', '.eJxVjDsOwyAQRO9CHSE-axAp0-cMaDG7wUkEkrErK3ePkFwk5cx7M4eIuG8l7p3WuGRxFVpcfruE84vqAPmJ9dHk3Oq2LkkORZ60y3vL9L6d7t9BwV7GOgVSDsEyEwP6HDx7A2lSzmhjJ2aFlGc0ASwlR8AKMo-swLBO4vMFBTc4tw:1sgSU7:4wbG2JdcKE8Ef-5Lrd3A7fEGRrq2owQ1NBQY2WefbjY', '2024-09-03 17:17:31.907741'),
('v5u7soj2rfwnpcyrpf7yktirj7ybzpb7', '.eJxVjDsOwyAQRO9CHSE-axAp0-cMaDG7wUkEkrErK3ePkFwk5cx7M4eIuG8l7p3WuGRxFVpcfruE84vqAPmJ9dHk3Oq2LkkORZ60y3vL9L6d7t9BwV7GOgVSDsEyEwP6HDx7A2lSzmhjJ2aFlGc0ASwlR8AKMo-swLBO4vMFBTc4tw:1sdeVI:CZd81cerYWAC0QKXmIRLBVXxVR-LJspaE-x2nfCnHg4', '2024-08-26 23:31:08.578715'),
('xw2xlhdds3pbbydsqsiglbtobxscjzb4', '.eJxVjDsOwyAQRO9CHSE-axAp0-cMaDG7wUkEkrErK3ePkFwk5cx7M4eIuG8l7p3WuGRxFVpcfruE84vqAPmJ9dHk3Oq2LkkORZ60y3vL9L6d7t9BwV7GOgVSDsEyEwP6HDx7A2lSzmhjJ2aFlGc0ASwlR8AKMo-swLBO4vMFBTc4tw:1sgggO:iiJZ0VaIRCtmW5KQOWnW8KKP5lSZz6K6gvqtv0RYFig', '2024-09-04 08:27:08.766333');

-- --------------------------------------------------------

--
-- Table structure for table `posts_bookmark`
--

CREATE TABLE `posts_bookmark` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts_category`
--

CREATE TABLE `posts_category` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` longtext DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `parent_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts_category`
--

INSERT INTO `posts_category` (`id`, `name`, `slug`, `description`, `image`, `created_at`, `updated_at`, `parent_id`) VALUES
(1, 'Short Stories', 'short-stories', 'Short stories for dear readers', '', '2024-08-20 20:40:50.734358', '2024-08-20 20:40:50.734358', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `posts_comment`
--

CREATE TABLE `posts_comment` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(254) DEFAULT NULL,
  `comment` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `approved` tinyint(1) NOT NULL,
  `post_id` bigint(20) NOT NULL,
  `parent_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts_post`
--

CREATE TABLE `posts_post` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `excerpt` longtext DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `views` int(10) UNSIGNED NOT NULL CHECK (`views` >= 0),
  `published_date` datetime(6) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `status` varchar(20) NOT NULL,
  `allow_comments` tinyint(1) NOT NULL,
  `seo_title` varchar(255) DEFAULT NULL,
  `meta_description` varchar(160) DEFAULT NULL,
  `meta_keywords` varchar(255) DEFAULT NULL,
  `author_id` int(11) NOT NULL,
  `category_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts_post`
--

INSERT INTO `posts_post` (`id`, `title`, `slug`, `content`, `excerpt`, `image`, `views`, `published_date`, `created_at`, `updated_at`, `status`, `allow_comments`, `seo_title`, `meta_description`, `meta_keywords`, `author_id`, `category_id`) VALUES
(1, 'New Post To check template', 'new-post-to-check-template', '<p>She looked around and was satisfied with what she saw, smiling she went to their bed room to put on the sexy lining she had ordered earlier that week, she has been planning this for a week now, she finally found the right time to show him what she was made off, how could he ignore her, for almost a month, she just couldn\'t take it anymore and was going all out to get him.<br>Mr Jin was was her husband, and they have been married for 2 year now, and tho their sex life has always been good but for almost a month now, she noticed that he had been withdrawaling and rarely touch her, some night she would ware something very revealing to awake his desire, but he would just kiss her and cuddle her to bed, of course she thought he was cheating at some point, and after she did her findings she found out she was wrong, her husband loves her and had always showed it, he gets her gift and surprise her with rose and little love notes, what then could be the problem? She thought, or was he impotent??, NO!!! she screamed in her head and scolded herself for thinking about something like that, well today she will find out the problem.<br>&nbsp; &nbsp;Mr Jin had just returned to his office after series of meeting, this half been going on now for almost a month, he hadn\'t had a spare time except when he slept, Oh! He hurriedly put his hand in his pocket to collect his phone, his lovely wife had sent him something but he had been too busy to check, now he had time for her, it was a picture and a write up which read “come home babyboy, mama is waiting” he was speechless he couldn\'t wait to finish the last paperwork on his desk so he could go home to his wife, that woman she sure knows how to provoke him, he missed her already, as he signed the last paper, the picture his wife sent to him earlier flashed through his mind, he put his phone in his pocket but not before taking a peek at the picture one more time, he took his bag and car keys and left for home.<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ……………….<br>&nbsp; She was dressed, she lit the candlestick in the room and sprayed some fragrance over the petals on the bed, the petals reminded her of their 2 years marriage anniversary her husband had prepared a surprise for her using similar petals, red petals on the white bedsheets, with a smile on her face she took the rose on the table and let it sit perfectly on her hair, she smiled with satisfaction, her alarm went off,it was time, just as she reached the sitting room she heard her husbands car honk, she then sat on the table in the center of the living room with her legs parted in a way that her thigh and part of her p***y was revealed, the door opened.<br>&nbsp; &nbsp; &nbsp;Nothing could have prepared Mr Jin for what he was about to see, he always knew his wife was crazy but he hadn\'t lmagined her like this,<br>She was wearing a black see through net gown that did nothing at covering her, he could clearly see her nipples, he swallowed hard, he was still in shock when her sweet voice brought him back to reality, “you are home honey, come and eat” eat? Of cause mama I want to eat you up right… he was still mid sentence when she stood up, leaning in on him she took his bag and press a kiss on his lips, then led him to the dining, Oh this is the food, the aroma reminded him that he was hungry, he looked at his wife and said “babe” she smiled and led him to sit, she had made rice and beef stew with fried plantain and a glass of orange juice, they sat down to eat,&nbsp;<br>&nbsp; His wife is faired skin and had a perfect body shape, while they were eating he could feel her legs on his thighs, she was fueling his desire, he could no longer focus on the food, he stood up to devour her, but she said in a sluppy tone, “no baby mama put in a lot of effort to make dinner and she won\'t be happy if you don\'t eat, so be a good boy and eat up”, hearing that he wondered what game she was playing. He decided to play along, smiled and continue eating.<br>&nbsp; &nbsp; They were done with dinner, and she was clearing up the table, she let a spoon drop, and she bent over to pick it, revealing her p***y again, Jin who had his eyes glued to her the whole time saw that and he could feel his other member grow, before he could move, she had gone to the kitchen, he decided to wait patiently for her to come back.&nbsp;<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;************<br>&nbsp;5 minutes later and no sign of her he couldn\'t wait anymore and decided to go check her up in the kitchen, but she wasn\'t there, as he turned to go back he saw a note on the door, “meet me in the bedroom” he quickly went to the badroom, and opened the door, the room was dim red because of the lighting, a sweet fragrance covered him, adjusting his eyes to the light he saw his wife sitting on the bed in the exact same posture he met her when he came back from work. But this time she parted her legs wider, the rose which she had on her hair earlier was now between her lips and she tilted her head backwards revealing her neck and part of her breast, F**K he muttered, he took long strides towards her then slowed down a bit when he got close to her, He could clearly see her face now, he smiled bent over and kissed her, she put her hands around his neck and deepened the kiss, he tore off his shirt revealing his abs and packs she could not help but touch and feel his muscles with plam, she was jolted back to reality when she felt him pinch her nipples it was her night not his, with that she flipped him over, he was surprised and asked “really mama” they both laughed and she sucking on his nipples he groaned “this woman” she took her lips off his nipples kissed him lightly on the lips and traced kisses down his body as she unbuckled his belt, he was in heaven, his senses returned when he felt her worm sluppy lips on his dick. But to wasn\'t for long , her lips worked well he could feel himself building up, she could feel it too, she stoped and hovered over him, while he looked at her with pleading gaza, she smiled bent and wispiered in his ear “not now baby boy” she sat up and took off her gown revealing all her curves, his hand ran over her body, she was perfect she took him in and hands and slide into her “mmmm” she moans she slowly started bouncing on him he could feel her wetness, he watched her ride him, “God my wife is beautiful” he thought, now she was bouncing faster on him, he groaned,he was close he draw her close to himself liffed her ass and began thrusting faster, she became a moaning mess, “ba……by” she screamed, say my name he whispered in her ear, “Jinnnn” she moaned am coming she moaned breathlessly, “don\'t” he ordered, flipping her over with him on top, lifting her legs to his shoulder revealing her plump pussy that has now turned pink, he slid in her again and “Hmmmm” he groaned “Jinnnn” she moaned, he could feel her building up, “Ba…..by” he was close too he increased his speed, the sight of his wife grasping the sheet was priceless, he had missed this, “am coming” she cried, he let her thrusting faster and harder, he released himself in her filling her up, he smiled as he bent and kissed her lovingly, laid down beside her, cuddling her in his arms, why have you been avoiding me she asked, he smiled turning her to face him he answered we won the contract babe, frown confused and asked what contract, the one with the London company, her eyes widened baaabe you didn\'t tell you were going to pursue it she smiled joyously, he draw her back into his arm and replied i know how much you want you to relocate to the states and this company gives us the opportunity, i didn\'t tell you because i didn\'t want to raise your hope and then dash it if the contract didn\'t work, thank you babe for being the best husband, and thank you too for being the best wife, she smiled leaned into him and slept off.</p>', 'sample description', 'post_images/Default_A_cluster_of_ripe_grapes_nestled_in_a_bed_of_green_lea_5.jpg', 0, '2024-08-21 10:12:39.000000', '2024-08-20 20:41:44.825804', '2024-08-21 10:12:43.246484', 'published', 1, NULL, NULL, NULL, 1, 1),
(2, 'Another new one', 'another-new-one', '<p>Random content</p>', 'Summary', 'post_images/Default_A_Rose_flower_realistic_with_blue_background_2.jpg', 0, '2024-08-21 10:12:49.000000', '2024-08-20 21:23:22.281527', '2024-08-21 10:12:50.280407', 'published', 1, NULL, NULL, NULL, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `posts_reaction`
--

CREATE TABLE `posts_reaction` (
  `id` bigint(20) NOT NULL,
  `reaction_type` varchar(10) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `post_id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `taggit_tag`
--

CREATE TABLE `taggit_tag` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `taggit_taggeditem`
--

CREATE TABLE `taggit_taggeditem` (
  `id` int(11) NOT NULL,
  `object_id` int(11) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts_profile`
--
ALTER TABLE `accounts_profile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `ads_ad`
--
ALTER TABLE `ads_ad`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `core_sitesettings`
--
ALTER TABLE `core_sitesettings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `core_sitesettings_social_media_links`
--
ALTER TABLE `core_sitesettings_social_media_links`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `core_sitesettings_social_sitesettings_id_socialme_ebd7b95c_uniq` (`sitesettings_id`,`socialmedialink_id`),
  ADD KEY `core_sitesettings_so_socialmedialink_id_77bc0b83_fk_core_soci` (`socialmedialink_id`);

--
-- Indexes for table `core_socialmedialink`
--
ALTER TABLE `core_socialmedialink`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `core_staticpage`
--
ALTER TABLE `core_staticpage`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `posts_bookmark`
--
ALTER TABLE `posts_bookmark`
  ADD PRIMARY KEY (`id`),
  ADD KEY `posts_bookmark_user_id_98497ce1_fk_auth_user_id` (`user_id`),
  ADD KEY `posts_bookmark_post_id_1c5f0d8d_fk_posts_post_id` (`post_id`);

--
-- Indexes for table `posts_category`
--
ALTER TABLE `posts_category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `posts_category_parent_id_b37ece90_fk_posts_category_id` (`parent_id`);

--
-- Indexes for table `posts_comment`
--
ALTER TABLE `posts_comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `posts_comment_parent_id_ae76dcba_fk_posts_comment_id` (`parent_id`),
  ADD KEY `posts_comment_post_id_e81436d7_fk_posts_post_id` (`post_id`);

--
-- Indexes for table `posts_post`
--
ALTER TABLE `posts_post`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `posts_post_author_id_fe5487bf_fk_auth_user_id` (`author_id`),
  ADD KEY `posts_post_category_id_ab339803_fk_posts_category_id` (`category_id`);

--
-- Indexes for table `posts_reaction`
--
ALTER TABLE `posts_reaction`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `posts_reaction_user_id_article_id_reaction_type_006a1132_uniq` (`user_id`,`post_id`,`reaction_type`),
  ADD KEY `posts_reaction_post_id_897f4c69_fk_posts_post_id` (`post_id`);

--
-- Indexes for table `taggit_tag`
--
ALTER TABLE `taggit_tag`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `taggit_taggeditem`
--
ALTER TABLE `taggit_taggeditem`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `taggit_taggeditem_content_type_id_object_id_tag_id_4bb97a8e_uniq` (`content_type_id`,`object_id`,`tag_id`),
  ADD KEY `taggit_taggeditem_tag_id_f4f5b767_fk_taggit_tag_id` (`tag_id`),
  ADD KEY `taggit_taggeditem_object_id_e2d7d1df` (`object_id`),
  ADD KEY `taggit_tagg_content_8fc721_idx` (`content_type_id`,`object_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts_profile`
--
ALTER TABLE `accounts_profile`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ads_ad`
--
ALTER TABLE `ads_ad`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `core_sitesettings`
--
ALTER TABLE `core_sitesettings`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `core_sitesettings_social_media_links`
--
ALTER TABLE `core_sitesettings_social_media_links`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `core_socialmedialink`
--
ALTER TABLE `core_socialmedialink`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `core_staticpage`
--
ALTER TABLE `core_staticpage`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `posts_bookmark`
--
ALTER TABLE `posts_bookmark`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts_category`
--
ALTER TABLE `posts_category`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `posts_comment`
--
ALTER TABLE `posts_comment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts_post`
--
ALTER TABLE `posts_post`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `posts_reaction`
--
ALTER TABLE `posts_reaction`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `taggit_tag`
--
ALTER TABLE `taggit_tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `taggit_taggeditem`
--
ALTER TABLE `taggit_taggeditem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accounts_profile`
--
ALTER TABLE `accounts_profile`
  ADD CONSTRAINT `accounts_profile_user_id_49a85d32_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `core_sitesettings_social_media_links`
--
ALTER TABLE `core_sitesettings_social_media_links`
  ADD CONSTRAINT `core_sitesettings_so_sitesettings_id_1f35091e_fk_core_site` FOREIGN KEY (`sitesettings_id`) REFERENCES `core_sitesettings` (`id`),
  ADD CONSTRAINT `core_sitesettings_so_socialmedialink_id_77bc0b83_fk_core_soci` FOREIGN KEY (`socialmedialink_id`) REFERENCES `core_socialmedialink` (`id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `posts_bookmark`
--
ALTER TABLE `posts_bookmark`
  ADD CONSTRAINT `posts_bookmark_post_id_1c5f0d8d_fk_posts_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts_post` (`id`),
  ADD CONSTRAINT `posts_bookmark_user_id_98497ce1_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `posts_category`
--
ALTER TABLE `posts_category`
  ADD CONSTRAINT `posts_category_parent_id_b37ece90_fk_posts_category_id` FOREIGN KEY (`parent_id`) REFERENCES `posts_category` (`id`);

--
-- Constraints for table `posts_comment`
--
ALTER TABLE `posts_comment`
  ADD CONSTRAINT `posts_comment_parent_id_ae76dcba_fk_posts_comment_id` FOREIGN KEY (`parent_id`) REFERENCES `posts_comment` (`id`),
  ADD CONSTRAINT `posts_comment_post_id_e81436d7_fk_posts_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts_post` (`id`);

--
-- Constraints for table `posts_post`
--
ALTER TABLE `posts_post`
  ADD CONSTRAINT `posts_post_author_id_fe5487bf_fk_auth_user_id` FOREIGN KEY (`author_id`) REFERENCES `auth_user` (`id`),
  ADD CONSTRAINT `posts_post_category_id_ab339803_fk_posts_category_id` FOREIGN KEY (`category_id`) REFERENCES `posts_category` (`id`);

--
-- Constraints for table `posts_reaction`
--
ALTER TABLE `posts_reaction`
  ADD CONSTRAINT `posts_reaction_post_id_897f4c69_fk_posts_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts_post` (`id`),
  ADD CONSTRAINT `posts_reaction_user_id_286f6cba_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `taggit_taggeditem`
--
ALTER TABLE `taggit_taggeditem`
  ADD CONSTRAINT `taggit_taggeditem_content_type_id_9957a03c_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `taggit_taggeditem_tag_id_f4f5b767_fk_taggit_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `taggit_tag` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
