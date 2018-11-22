import 'package:angular/angular.dart';
import './src/components/index_page/index_page.dart';
import './src/components/about_page/about_page.dart';
import './src/components/portfolio_page/portfolio_page.dart';
import './src/components/strength_page/strength_page.dart';
import './src/components/contact_page/contact_page.dart';
import 'dart:html';
import 'dart:async';
import './events.dart';


@Component(
  selector: 'my-app',
  styleUrls: ['app_component.css'],
  templateUrl: 'app_component.html',
  directives: [IndexPage, AboutPage, PortfolioPage, StrengthPage, ContactPage],
)
class AppComponent implements AfterViewInit  {

  StreamSubscription subscription;

  bool isHtmlLoaded = false;
  bool isPortfolioLoaded = false;

  AppComponent(){
    pageListen();
  }

  ngAfterViewInit(){
    querySelector('#preloader').classes.add('preloaderHide');
    new Timer(const Duration(seconds: 4), (){
      eventBus.fire(new Loaded(isHtmloLoaded: true));
    });
  }

  void pageListen() {
    eventBus.on<Loaded>().listen((event) {
      if(event.isHtmloLoaded == true)
        isHtmlLoaded = true;
      if(event.isPortfolioLoaded == true)
        isPortfolioLoaded = true;
      showHidePreloader();
    });
  }

  void showHidePreloader(){
    if(isHtmlLoaded == true && isPortfolioLoaded == true)
      querySelector('#preloader').style.display = 'none';
  }

}
