import 'dart:async';

abstract class AbstractPage{
  bool show;
  void pageClose();
  void pageListen();
  StreamSubscription subscription;
}