import { UnderlineLink } from '@/components/links';

export const Footer = () => (
  <footer className='absolute bottom-0 inset-x-0 text-center py-6 text-gray-700 bg-white'>
    © {new Date().getFullYear()} By{' '}
    <UnderlineLink href='https://www.instagram.com/malaysianpaygap/'>
      malaysianpaygap
    </UnderlineLink>
  </footer>
);
