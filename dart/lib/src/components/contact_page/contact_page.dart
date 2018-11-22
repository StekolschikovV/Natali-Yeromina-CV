import 'package:angular/angular.dart';
import 'dart:html';
import 'dart:async';
import 'package:http/browser_client.dart';
import '../../../events.dart';
import '../abstract_page.dart';

@Component(
  selector: 'contact-page',
  styleUrls: ['contact_page.css'],
  templateUrl: 'contact_page.html',
  directives: [coreDirectives],
)
class ContactPage implements AbstractPage {
  bool show = false;

  String modalClass = '';
  String modalStyle = '';

  @ViewChild("formInputName")
  InputElement formInputName;

  @ViewChild("formInputEmail")
  InputElement formInputEmail;

  @ViewChild("formInputSubject")
  InputElement formInputSubject;

  @ViewChild("formInputMassage")
  TextAreaElement formInputMassage;

  StreamSubscription subscription;

  ContactPage() {
    pageListen();
  }

  void pageListen() {
    eventBus.on<Nav>().listen((event) {
      event.nowPage == Page.Contact ? show = true : show = false;
    });
  }

  void pageClose() {
    eventBus.fire(new Nav(null));
  }

  void formOnSubmitHandler() {
    bool isName = formInputName.value.length > 0;
    bool isEmail = formInputEmail.value.length > 0;
    bool isSubject = formInputSubject.value.length > 0;
    bool isMassage = formInputMassage.value.length > 0;
    if (isName && isEmail && isSubject && isMassage) {
      modalClass = 'show';
      modalStyle = 'display: block';
      sendEmail();
    }
  }

  void formClose() {
    modalClass = '';
    modalStyle = '';
  }

  void sendEmail() async {
    var client = new BrowserClient();
    var url = 'http://yeromina.com/send_form_email.php';
    var response =
    await client.post(url, body: {
      'Name': formInputName.value,
      'Email': formInputEmail.value,
      'Subject': formInputSubject.value,
      'Massage': formInputMassage.value,
    });
    print('Response status: ${response.statusCode}');
    print('Response body: ${response.body}');
  }
}
