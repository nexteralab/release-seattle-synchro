CREATE TABLE `coaches` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`title` text DEFAULT '' NOT NULL,
	`email` text,
	`bio` text DEFAULT '' NOT NULL,
	`specialties` text DEFAULT '[]' NOT NULL,
	`certifications` text DEFAULT '[]' NOT NULL,
	`image_url` text,
	`active` integer DEFAULT true NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `config` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `news` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`excerpt` text DEFAULT '' NOT NULL,
	`content` text DEFAULT '' NOT NULL,
	`cover_url` text,
	`category` text,
	`author` text DEFAULT '' NOT NULL,
	`user_id` text,
	`tags` text DEFAULT '[]' NOT NULL,
	`meta_title` text,
	`meta_description` text,
	`read_time_minutes` integer,
	`published` integer DEFAULT false NOT NULL,
	`published_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `news_slug_unique` ON `news` (`slug`);--> statement-breakpoint
CREATE INDEX `news_published_idx` ON `news` (`published`,`published_at`);--> statement-breakpoint
CREATE TABLE `post_analytics` (
	`id` text PRIMARY KEY NOT NULL,
	`post_id` text NOT NULL,
	`post_type` text NOT NULL,
	`event_type` text NOT NULL,
	`session_id` text NOT NULL,
	`visitor_id` text,
	`scroll_pct` integer,
	`time_spent` integer,
	`referrer` text,
	`device` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `post_analytics_post_idx` ON `post_analytics` (`post_id`,`created_at`);--> statement-breakpoint
CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`excerpt` text DEFAULT '' NOT NULL,
	`content` text DEFAULT '' NOT NULL,
	`cover_url` text,
	`author` text DEFAULT '' NOT NULL,
	`user_id` text,
	`tags` text DEFAULT '[]' NOT NULL,
	`meta_title` text,
	`meta_description` text,
	`read_time_minutes` integer,
	`published` integer DEFAULT false NOT NULL,
	`published_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `posts_slug_unique` ON `posts` (`slug`);--> statement-breakpoint
CREATE INDEX `posts_published_idx` ON `posts` (`published`,`published_at`);--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`source` text DEFAULT 'general' NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`unsubscribed_at` text,
	`created_at` text NOT NULL
);
