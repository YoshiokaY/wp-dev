<?php
/**
 * フロントページテンプレート
 * 
 * @package MyTheme
 */

get_header(); ?>

<div class="container">
    <main id="main" class="site-main">
        
        <?php if (have_posts()) : ?>
            <?php while (have_posts()) : ?>
                <?php the_post(); ?>
                
                <article id="post-<?php the_ID(); ?>" <?php post_class('front-page-content'); ?>>
                    
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="hero-section">
                            <?php the_post_thumbnail('featured-large', array('class' => 'hero-image')); ?>
                            <div class="hero-content">
                                <h1 class="hero-title"><?php the_title(); ?></h1>
                            </div>
                        </div>
                    <?php else : ?>
                        <header class="entry-header">
                            <h1 class="entry-title"><?php the_title(); ?></h1>
                        </header>
                    <?php endif; ?>

                    <div class="entry-content">
                        <?php the_content(); ?>
                    </div>
                </article>
                
            <?php endwhile; ?>
        <?php endif; ?>

        <!-- 最新の投稿セクション -->
        <?php
        $recent_posts = new WP_Query(array(
            'post_type' => 'post',
            'posts_per_page' => 3,
            'post_status' => 'publish',
        ));
        
        if ($recent_posts->have_posts()) : ?>
            <section class="recent-posts-section">
                <h2 class="section-title">最新の投稿</h2>
                <div class="posts-grid">
                    <?php while ($recent_posts->have_posts()) : ?>
                        <?php $recent_posts->the_post(); ?>
                        
                        <article class="post-card">
                            <?php if (has_post_thumbnail()) : ?>
                                <div class="post-thumbnail">
                                    <a href="<?php the_permalink(); ?>">
                                        <?php the_post_thumbnail('featured-medium'); ?>
                                    </a>
                                </div>
                            <?php endif; ?>
                            
                            <div class="post-content">
                                <h3 class="post-title">
                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </h3>
                                
                                <div class="post-meta">
                                    <time datetime="<?php echo esc_attr(get_the_date('c')); ?>">
                                        <?php echo get_the_date(); ?>
                                    </time>
                                </div>
                                
                                <div class="post-excerpt">
                                    <?php the_excerpt(); ?>
                                </div>
                                
                                <a href="<?php the_permalink(); ?>" class="read-more">
                                    続きを読む
                                </a>
                            </div>
                        </article>
                        
                    <?php endwhile; ?>
                </div>
                
                <div class="section-footer">
                    <a href="<?php echo get_permalink(get_option('page_for_posts')); ?>" class="view-all-posts">
                        すべての投稿を見る
                    </a>
                </div>
            </section>
            
            <?php wp_reset_postdata(); ?>
        <?php endif; ?>

        <!-- CTA セクション -->
        <section class="cta-section">
            <div class="cta-content">
                <h2>お問い合わせ</h2>
                <p>ご質問やご相談がございましたら、お気軽にお問い合わせください。</p>
                <a href="<?php echo esc_url(get_permalink(get_page_by_path('contact'))); ?>" class="cta-button">
                    お問い合わせはこちら
                </a>
            </div>
        </section>

    </main>
</div>

<?php get_footer(); ?>