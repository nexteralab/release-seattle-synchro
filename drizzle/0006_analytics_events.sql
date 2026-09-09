CREATE TABLE `analytics_events` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`path` text NOT NULL,
	`post_id` text,
	`post_type` text,
	`session_id` text NOT NULL,
	`visitor_id` text,
	`is_new_visitor` integer DEFAULT true NOT NULL,
	`scroll_pct` integer,
	`time_spent` integer,
	`referrer` text,
	`referrer_type` text,
	`utm_source` text,
	`utm_medium` text,
	`utm_campaign` text,
	`device` text,
	`country` text,
	`is_bot` integer DEFAULT false NOT NULL,
	`conversion` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `ae_created_idx` ON `analytics_events` (`created_at`);--> statement-breakpoint
CREATE INDEX `ae_type_created_idx` ON `analytics_events` (`type`,`created_at`);--> statement-breakpoint
CREATE INDEX `ae_path_created_idx` ON `analytics_events` (`path`,`created_at`);--> statement-breakpoint
CREATE INDEX `ae_session_idx` ON `analytics_events` (`session_id`);--> statement-breakpoint
CREATE INDEX `ae_post_idx` ON `analytics_events` (`post_id`,`created_at`);