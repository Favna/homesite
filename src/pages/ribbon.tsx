import Analytics from '@Config/Analytics';
import { createSeoProps } from '@Config/next-seo.config';
import { NextSeo } from 'next-seo';
import React from 'react';

export default () => (
  <>
    <Analytics />
    <NextSeo {...createSeoProps({ title: 'Ribbon' })} />
    <p>Ribbon Page</p>
  </>
);
