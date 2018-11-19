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
  directives: [coreDirectives],
)
class StrengthPage implements AfterViewInit {

  bool show = false;

  @ViewChild("scrollable")
  Element scrollable;

  @ViewChild("clientInt")
  Element clientInt;

  StreamSubscription subscription;

  int animImg = 0;
  bool IsAnimRun = false;
  int happyClientsNow = 0;
  int happyClientsMax = 95;
  int projectDoneNow = 0;
  int projectDoneMax = 164;

  StrengthPage() {
    pageListen();
    animLoop();
  }

  ngAfterViewInit() {
    scrollable.onScroll.listen((Event event) => updateScrollInfo(event));
  }

  void updateScrollInfo(Event event) {
    Element page = event.target as Element;
    if((clientInt.offsetTop - window.innerHeight) + 50 < page.scrollTop && !IsAnimRun){
      animClientInt();
    }
  }

  void animClientInt(){
    if(happyClientsNow != happyClientsMax)
      ++happyClientsNow;
    if(projectDoneNow != projectDoneMax){
      ++projectDoneNow;
      new Timer(const Duration(milliseconds: 10), () {
        animClientInt();
      });
    }
  }

  void animLoop() {
    new Timer(const Duration(seconds: 10), () {
      if (animImg < 5)
        animImg++;
      else
        animImg = 0;
      animLoop();
    });
  }

  void pageListen() {
    eventBus.on<Nav>().listen((event) {
      event.nowPage == Page.Strength ? show = true : show = false;
    });
  }

  void pageClose() {
    eventBus.fire(new Nav(null));
  }
}
