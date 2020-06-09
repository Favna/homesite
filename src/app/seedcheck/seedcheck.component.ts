import { Component, OnInit } from '@angular/core';
import { SeoService, SeoTags } from '@services/seo.service';
import { SEEDCHECKER_GITHUB_URL } from '@util/constants';
import { IMatCarouselOptions, IPrimaryTile } from '@util/interfaces';
import ngForTrackBy from '@util/ngForTrackBy';
import { oneLine } from 'common-tags';

@Component({
  selector: 'favware-seedcheck',
  templateUrl: './seedcheck.component.html',
  styleUrls: ['./seedcheck.component.scss']
})
export class SeedcheckComponent implements OnInit {
  public ngForTrackBy = ngForTrackBy;
  public headerTile: IPrimaryTile = {
    header: 'SEEDChecker',
    subheader: 'Periodically check if the SEED for a Nintendo 3DS title is available',
    buttons: [
      {
        text: 'Download SEEDChecker',
        url: `https://cdn.favware.tech/binaries/SEEDChecker.jar`,
        color: 'primary',
        outer: true
      },
      {
        text: 'Download Java',
        url: 'https://adoptopenjdk.net/',
        color: 'warn',
        outer: true
      },
      {
        text: 'View on GitHub',
        url: SEEDCHECKER_GITHUB_URL,
        color: 'github',
        outer: true
      }
    ]
  };
  public aboutTile: IPrimaryTile = {
    header: 'About',
    subheader: '',
    text: [
      oneLine`SEEDChecker is a Java application that can periodically check
            if the decryption seed for a given title is available.
            If a SEED is available it is automatically downloaded to your default "Downloads" folder`
    ]
  };
  public instructionsTile: IPrimaryTile = {
    header: 'Instructions',
    subheader: '',
    text: [
      '_Step 1_',
      'Get the TitleID for your title. Recommended sites are [3dsdb](http://www.3dsdb.com) or [3ds titlekeys](http://3ds.titlekeys.gq/)',
      '_Step 2_',
      'Get the ISO Alpha 2 Country Code for your country of choice, you can find the list at [nations online](http://www.nationsonline.org/oneworld/country_code_list.htm)',
      '_Step 3_',
      'Choose your repeat interval',
      '_Step 4_',
      'Press **Start SEED Checking** to start the process',
      '_Quitting_',
      'If you want to quit checking either close the program or click the **Cancel SEED Checking** button'
    ]
  };
  public faqTile: IPrimaryTile = {
    header: 'FAQ',
    subheader: '',
    text: [
      "_**Q:** It doesn't start!_",
      '**A:** Make sure you have associated the .jar extension with Java. To do so right click the program then `open with` and then select the `Java platform.`',
      "_**Q:** I can't find the Java platform in the list!_",
      '**A:** Make sure you install Java using the button above. Amazon Corretto version of Java is guaranteed to work!'
    ]
  };
  public slides: { url: string }[] = [{ url: '/assets/screenshots/seedcheck/base.png' }, { url: '/assets/screenshots/seedcheck/noseed.png' }, { url: '/assets/screenshots/seedcheck/seed.png' }];
  public carousel: IMatCarouselOptions = {
    timings: '250ms ease-in',
    autoplay: true,
    interval: 5000,
    loop: true,
    hideArrows: false,
    hideIndicators: false,
    color: 'warn',
    maxWidth: 'auto',
    proportion: 35,
    slides: this.slides.length,
    overlayColor: '#00000040',
    hideOverlay: true,
    useKeyboard: true,
    useMouseWheel: true,
    orientation: 'ltr'
  };
  public metadata: SeoTags = {
    title: 'SEEDChecker',
    description: '3DS SEEDChecking utility',
    image: 'https://favware.tech/assets/icons/seedcheck-share.png',
    imageAlt: 'SEEDChecker Preview Image',
    url: 'seedcheck',
    summary: oneLine`A Java based utility that can be used to fetch the SEED descryption keys for 3DS games`,
    keywords: ['3ds', 'nintendo', 'hacking', 'seed', 'java', 'program', 'utility', 'tool']
  };

  constructor(private seo: SeoService) {}

  public ngOnInit(): void {
    this.seo.generateTags({
      title: this.metadata.title,
      description: this.metadata.description,
      image: this.metadata.image,
      imageAlt: this.metadata.imageAlt,
      url: this.metadata.url,
      summary: this.metadata.summary,
      keywords: this.metadata.keywords
    });
  }
}
