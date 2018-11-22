
import 'package:event_bus/event_bus.dart';

EventBus eventBus = new EventBus();

enum Page { About, Strength, Contact, Portfolio}

class Nav{
  Page nowPage = null;
  Nav(this.nowPage);
}

class Loaded {
  bool isPortfolioLoaded = false;
  bool isHtmloLoaded = false;
  Loaded({isPortfolioLoaded, isHtmloLoaded}){
    if(isPortfolioLoaded != null)
      this.isPortfolioLoaded = isPortfolioLoaded;
    if(isHtmloLoaded != null)
      this.isHtmloLoaded = isHtmloLoaded;
  }
}