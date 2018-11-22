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

class IndexPage{

  String textName = "I'm\n Natali Yeromina";
  String textWork = "I'm\n Graphic Design";

  String title = '';

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
    new Timer(const Duration(milliseconds: 300), (){
      if(type == 'name'){
        if(title.length == textName.length - 1){
          title = '';
          titleAnimation('work');
        } else {
          title += textWork[title.length];
          titleAnimation('name');
        }
      } else {
        if(title.length == textWork.length){
          title = '';
          titleAnimation('name');
        } else {
          title += textName[title.length];
          titleAnimation('work');
        }
      }
    });
  }

}
