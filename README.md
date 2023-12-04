# chainblock

[chainblock](https://chainblock.art) is an open source hardware project for displaying NFT art. The project consists of a Raspberry Pi image and a dapp.

The Pi image is based off of [jareware/chilipie-kiosk](https://github.com/jareware/chilipie-kiosk). The image launches chromium in kiosk mode and opens [https://chainblock.art](https://chainblock.art), which serves the NextJS app in this repo. We are primarily designing for a square display, and focusing our efforts on dynamic NFTs and related apps.


## dapp functionality

The long term goal is to allow users to display any of their NFTs. Users will also be able to choose to display free apps or widgets contributed by 3rd party developers.

We use WalletConnect QR codes to immediately ask the user to authenticate a wallet. Once authenticated, we use SimpleHash API to fetch their NFTs across multiple chains. Right now we are only fetching NFTs from supported collections. We are also displaying a few free widgets and some specific NFTs from collections we want to test. In the future this will be replaced by some app store or settings page that lets a user customize the things they display.

We then use [Swiper.js](https://swiperjs.com/) to display an auto-playing slideshow of React components.