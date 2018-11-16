import 'package:angular/angular.dart';
import 'dart:html';

import 'dart:async';
import 'dart:html';
import '../../../events.dart';
import '../abstract_page.dart';

@Component(
  selector: 'contact-page',
  styleUrls: ['contact_page.css'],
  templateUrl: 'contact_page.html',
)
class ContactPage implements AbstractPage{

  bool show = false;

  StreamSubscription subscription;

  ContactPage(){
    pageListen();
  }

  void pageListen(){
    eventBus.on<Nav>().listen((event) {
      event.nowPage == Page.Contact ? show = true : show = false;
    });
  }

  void pageClose(){
    eventBus.fire(new Nav(null));
  }


}
