import 'package:angular/angular.dart';
import 'dart:html';
import '../abstract_page.dart';
import 'dart:async';
import 'dart:html';
import '../../../events.dart';

@Component(
  selector: 'portfolio-page',
  styleUrls: ['portfolio_page.css'],
  templateUrl: 'portfolio_page.html',
)
class PortfolioPage implements AbstractPage {

  bool show = false;

  StreamSubscription subscription;

  PortfolioPage(){
    pageListen();
  }

  void pageListen(){
    eventBus.on<Nav>().listen((event) {
      event.nowPage == Page.Portfolio ? show = true : show = false;
    });
  }

  void pageClose(){
    eventBus.fire(new Nav(null));
  }

}
