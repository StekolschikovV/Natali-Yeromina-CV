import 'package:angular/angular.dart';
import './src/components/index_page/index_page.dart';
import './src/components/about_page/about_page.dart';
import 'dart:html';
import 'dart:async';

@Component(
  selector: 'my-app',
  styleUrls: ['app_component.css'],
  templateUrl: 'app_component.html',
  directives: [IndexPage, AboutPage],
)
class AppComponent implements AfterViewInit  {

  AppComponent(){
    print('AppComponent ok');
  }
  ngAfterViewInit(){
//    preloader
    querySelector('#preloader').classes.add('preloaderHide');
    new Timer(const Duration(seconds: 2), (){
      querySelector('#preloader').style.display = 'none';
    });
  }
}
