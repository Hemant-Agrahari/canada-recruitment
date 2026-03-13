// pages/blog/[slug].js

import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Redirect = () => {
  const router = useRouter();

  useEffect(() => {
    const { slug } = router.query;
    switch (slug) {
      case '4-challenges-facing-recruiters-in-2021-and-how-to-overcome-them':
        router.replace('/blog/4-challenges-facing-recruiters-in-2021-and-how-to-overcome-them');
        break;
      case 'another-url':
        router.replace('/blog/another-url');
        break;
      // Add more cases for additional URLs
      default:
        break;
    }
  }, [router.query]);

  return (
    <></>
  );
};

export default Redirect;
