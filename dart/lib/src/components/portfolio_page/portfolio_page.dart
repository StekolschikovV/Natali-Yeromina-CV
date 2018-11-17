import 'package:angular/angular.dart';
import '../abstract_page.dart';
import 'dart:async';
import '../../../events.dart';
import 'package:firebase/firebase.dart' as fb;
import 'package:firebase/src/assets/assets.dart';
import '../data_type.dart';
import 'package:angular/angular.dart';

@Component(
  selector: 'portfolio-page',
  styleUrls: ['portfolio_page.css'],
  templateUrl: 'portfolio_page.html',
  directives: [coreDirectives ],
)

class PortfolioPage implements AbstractPage {

  bool show = false;

  List<PortfolioEl> portfolioEl = [];
  List<PortfolioEl> portfolioEl1 = [];
  List<PortfolioEl> portfolioEl2 = [];
  List<PortfolioEl> portfolioEl3 = [];

  StreamSubscription subscription;

  PortfolioPage(){
    pageListen();
    loadLink();
  }

  void loadLink() async {
    try {
      fb.initializeApp(
        apiKey: "AIzaSyA8bpN-HWexiOfk6uXYi3OLMnahw7xFE88",
        authDomain: "natali-yeromina.firebaseapp.com",
        databaseURL: "https://natali-yeromina.firebaseio.com",
        projectId: "natali-yeromina",
        storageBucket: "",
        messagingSenderId: "545859286062"
      );

    } on fb.FirebaseJsNotLoadedException catch (e) {
      print(e);
    }
    var defaultDatabase = fb.database();
    var portfolio = defaultDatabase.ref('portfolio');
    portfolio.onValue.listen((e) {
      var datasnapshot = e.snapshot;
      datasnapshot.forEach((el){
        portfolioEl.add(new PortfolioEl(
            el.val()['imgs'].toString(),
            el.val()['src'].toString(),
            el.val()['tag'].toString(),
            el.val()['title'].toString(),
        ));
      });
      sortLink();
    });
  }

  void sortLink(){
    int i = 0;
    portfolioEl.forEach((e){
      if(i == 0){
        portfolioEl1.add(e);
        i++;
      } else if(i == 1){
        portfolioEl2.add(e);
        i++;
      } else if(i == 2){
        portfolioEl3.add(e);
        i = 0;
      }
    });
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
