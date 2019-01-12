import 'package:angular/angular.dart';
import 'dart:html';
import 'dart:io';
import 'dart:async';
import 'package:http/browser_client.dart';


import '../../../events.dart';
import 'dart:convert';
@Component(
  selector: 'index-page',
  styleUrls: ['index_page.css'],
  templateUrl: 'index_page.html',
)

class IndexPage {

  String textName = "I'm\n Natalia\n Yeromina";
  String textWork = "I'm\n Graphic\n Designer";
  String title = '';

  String lastType = 'name';

  IndexPage()  {
    titleAnimation('name');
  }

  void navClickHandler(String page){
    eventBus.fire(new Nav(determinePage(page)));
  }

  Page determinePage(String page){
    Page pageRes = null;
    if(page == 'about')
      pageRes = Page.About;
    else if(page == 'strength')
      pageRes = Page.Strength;
    else if(page == 'contact')
      pageRes = Page.Contact;
    else if(page == 'portfolio')
      pageRes = Page.Portfolio;
    return pageRes;
  }

  void titleAnimation(String type){
    if(type == lastType){
      new Timer(const Duration(milliseconds: 300), (){
        setText(type);
      });
    } else {
      lastType = type;
      new Timer(const Duration(seconds: 3), (){
        setText(type);
      });
    }

  }

  void setText(String type){
    if(type == 'name'){
      if(title == textName){
        title = '';
        titleAnimation('work');
      } else {
        title += textName[title.length];
        querySelector('.h1-title').innerHtml = title.replaceAll('\n', '<br>');
        titleAnimation('name');
      }
    } else {
      if(title == textWork){
        title = '';
        titleAnimation('name');
      } else {
        title += textWork[title.length];
        querySelector('.h1-title').innerHtml = title.replaceAll('\n', '<br>');
        titleAnimation('work');
      }
    }
  }

}
