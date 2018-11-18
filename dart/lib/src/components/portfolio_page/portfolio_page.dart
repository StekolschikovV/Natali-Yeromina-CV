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

  bool show = true;

  List<PortfolioEl> portfolioEl = [];
  List<PortfolioEl> portfolioEl1 = [];
  List<PortfolioEl> portfolioEl2 = [];
  List<PortfolioEl> portfolioEl3 = [];
  List<String> selectedPortfolioEl = [];
  List<String> tagPortfolioEl = [];

  StreamSubscription subscription;

  PortfolioPage(){
    pageListen();
    loadLink();
  }

  void tagClickHandler(String e){
    if(selectedPortfolioEl.contains(e)){
      selectedPortfolioEl.remove(e);
    } else {
      selectedPortfolioEl.add(e);
    }
    sortLink();
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
        String tag = el.val()['tag'].toString();
        portfolioEl.add(new PortfolioEl(
            el.val()['img'].toString(),
            el.val()['src'].toString(),
            tag,
            el.val()['title'].toString(),
        ));
        if(!tagPortfolioEl.contains(tag) && tag != 'null')
            tagPortfolioEl.add(el.val()['tag'].toString());
      });
      sortLink();
    });
  }

  void sortLink(){
    int i = 0;
    portfolioEl1 = [];
    portfolioEl2 = [];
    portfolioEl3 = [];
    portfolioEl.forEach((e){
      if(selectedPortfolioEl.length == 0 || selectedPortfolioEl.contains(e.tag)){
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
