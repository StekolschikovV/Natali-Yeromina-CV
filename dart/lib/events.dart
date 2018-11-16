
import 'package:event_bus/event_bus.dart';

EventBus eventBus = new EventBus();

enum Page { About, Strength, Contact, Portfolio}

class Nav{
  Page nowPage = null;
  Nav(this.nowPage);
}