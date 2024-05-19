import { withContentlayer } from 'next-contentlayer'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(withContentlayer({
  reactStrictMode: false,
}))