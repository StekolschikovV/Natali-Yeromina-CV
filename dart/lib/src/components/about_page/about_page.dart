import 'package:angular/angular.dart';
import 'dart:html';

import 'dart:async';
import 'dart:html';
import '../../../events.dart';

@Component(
  selector: 'about-page',
  styleUrls: ['about_page.css'],
  templateUrl: 'about_page.html',
)
class AboutPage {

  bool show = false;

  StreamSubscription subscription;

  AboutPage(){
    eventBus.on<Nav>().listen((event) {
      print(event.nowPage == Page.About);
      event.nowPage == Page.About ? show = true : show = false;
    });
  }

  void pageClose(){
    eventBus.fire(new Nav(null));
  }

}
