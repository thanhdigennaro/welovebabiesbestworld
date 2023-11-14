// import useSite from 'hooks/use-site';
import { getPaginatedPosts } from 'lib/posts';
import { WebsiteJsonLd } from 'lib/json-ld';

import Layout from 'components/Layout';
// import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import PostCard from 'components/PostCard';
import Pagination from 'components/Pagination';

import styles from 'styles/pages/Home.module.scss';

export default function Home({ posts, pagination }) {
  // const { metadata = {} } = useSite();
  // const { title } = metadata;

  return (
    <Layout>
      <WebsiteJsonLd siteTitle={'Blogs'} />
      {/* <Header>
        <h1
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />

        <p
          className={styles.description}
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      </Header> */}

      <Section>
        <Container>
          {/* <h2 className="sr-only">Posts</h2> */}
          <div style={{ position: 'relative' }}>
            <div className={styles.featuredWrap}>
              {[...posts].splice(0, 1).map((post) => {
                return (
                  <div className={styles.featuredItem} key={post.slug}>
                    <PostCard post={post} featured />
                  </div>
                );
              })}
              <div className={styles.featuredItem}>
                {[...posts].splice(1, 2).map((post) => {
                  return (
                    <div key={post.slug}>
                      <PostCard post={post} featured />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <h3>Newest</h3>
          <div className={styles.posts}>
            {[...posts].splice(3).map((post) => {
              return (
                <div className={styles.posts.card} key={post.slug}>
                  <PostCard post={post} />
                </div>
              );
            })}
          </div>
          {pagination && (
            <Pagination
              addCanonical={false}
              currentPage={pagination?.currentPage}
              pagesCount={pagination?.pagesCount}
              basePath={pagination?.basePath}
            />
          )}
        </Container>
      </Section>
    </Layout>
  );
}

export async function getStaticProps() {
  const { posts, pagination } = await getPaginatedPosts({
    queryIncludes: 'archive',
  });
  return {
    props: {
      posts,
      pagination: {
        ...pagination,
        basePath: '/posts',
      },
    },
  };
}
