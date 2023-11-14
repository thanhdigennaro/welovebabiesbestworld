import Link from 'next/link';

import { postPathBySlug, sanitizeExcerpt } from 'lib/posts';

import Metadata from 'components/Metadata';

import { FaMapPin } from 'react-icons/fa';
import styles from './PostCard.module.scss';

const PostCard = ({ post, options = {}, featured }) => {
  const { title, excerpt, slug, date, author, categories, featuredImage, isSticky = false } = post;
  const { excludeMetadata = [] } = options;

  const metadata = {};

  if (!excludeMetadata.includes('author')) {
    metadata.author = author;
  }

  if (!excludeMetadata.includes('date')) {
    metadata.date = date;
  }

  if (!excludeMetadata.includes('categories')) {
    metadata.categories = categories;
  }

  let postCardStyle = styles.postCard;

  if (isSticky) {
    postCardStyle = `${postCardStyle} ${styles.postCardSticky}`;
  }

  return (
    <div className={postCardStyle}>
      {isSticky && <FaMapPin aria-label="Sticky Post" />}
      <figure className={styles.postCardFeatureImage}>
        <div>
          <Link href={postPathBySlug(slug)}>
            <img src={featuredImage?.sourceUrl} width="100%" height={'auto'} alt="feature img" />
          </Link>
        </div>
      </figure>
      {featured && (
        <div style={{ position: 'absolute', left: 15, right: 15, bottom: 15, zIndex: 20, fontWeight: '600' }}>
          <Link href={postPathBySlug(slug)}>
            <a
              style={{
                color: 'white',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                lineClamp: 2,
                '-webkit-box-orient': 'vertical',
                fontSize: 20,
              }}
            >
              <p
                dangerouslySetInnerHTML={{
                  __html: title,
                }}
              />
            </a>
          </Link>
        </div>
      )}
      {!featured && (
        <>
          <Link href={postPathBySlug(slug)}>
            <a>
              <h3
                className={styles.postCardTitle}
                dangerouslySetInnerHTML={{
                  __html: title,
                }}
              />
            </a>
          </Link>
          <Metadata className={styles.postCardMetadata} {...metadata} />

          {excerpt && (
            <div
              className={styles.postCardContent}
              dangerouslySetInnerHTML={{
                __html: sanitizeExcerpt(excerpt),
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PostCard;
