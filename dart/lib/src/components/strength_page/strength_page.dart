import 'package:angular/angular.dart';
import 'dart:html';
import '../abstract_page.dart';
import 'dart:async';
import 'dart:html';
import '../../../events.dart';

@Component(
  selector: 'strength-page',
  styleUrls: ['strength_page.css'],
  templateUrl: 'strength_page.html',
)
class StrengthPage {

  bool show = false;

  StreamSubscription subscription;

  StrengthPage(){
    pageListen();
  }

  void pageListen(){
    eventBus.on<Nav>().listen((event) {
      event.nowPage == Page.Strength ? show = true : show = false;
    });
  }

  void pageClose(){
    eventBus.fire(new Nav(null));
  }


}
