import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import {HEADER_HEIGHT} from 'src/constants/Header';
import {PRIVACY_MODAL_ACTIVE} from 'src/redux/action-types';
import {connect} from 'react-redux';

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const mapStateToProps = state => {
  const {ui} = state;
  return {ui};
};

const mapDispatchToProps = dispatch => {
  return {
    privacyModalActive: state =>
      dispatch({type: PRIVACY_MODAL_ACTIVE, state: state}),
  };
};

class PrivacyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accepted: false,
    };
  }

  render() {
    return (
      <Modal
        isVisible={this.props.ui.privacyModalActive}
        style={{flex: 1, margin: 0, backgroundColor: 'white'}}>
        <View style={styles.container}>
          <Text style={styles.title}>Privacy Policy</Text>
          <ScrollView
            style={styles.tcContainer}
            onScroll={({nativeEvent}) => {
              if (isCloseToBottom(nativeEvent)) {
                this.setState({
                  accepted: true,
                });
              }
            }}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.tcP}>
              This Privacy Policy is provided to let you know our policies and
              procedures regarding the collection, use and disclosure of your
              information obtained through the use of our App and Services.
            </Text>

            <Text style={styles.blueTitle}>
              What Kind of Information are We Collecting?
            </Text>
            <Text style={styles.blueTitle}>
              1. Information You Provide to Us
            </Text>
            <Text style={styles.tcP}>This includes: </Text>

            <Text style={styles.tcL}>
              {'\u2022'} <Text style={styles.bold}>Personal Information: </Text>{' '}
              While registering for and using KeyedIn we may require you to
              provide information that identifies you as a specific individual
              and can be used to contact or identify you (“
              <Text style={styles.bold}>Personal Information</Text>”). Examples
              of Personal Information include your name, email address, company
              address, billing address, and phone number. The Service is general
              audience and intended for users 18 and older. We do not knowingly
              collect Personal Information from anyone younger than age 18. If
              we become aware that a child younger than 18 has provided us with
              Personal Information, we will use commercially reasonable efforts
              to delete such information from our files. If you are the parent
              or legal guardian of a child younger than age 18 and believe that
              KeyedIn has collected Personal Information from your child, please
              contact us.
            </Text>
            <Text style={styles.tcL}>
              {'\u2022'} <Text style={styles.bold}>Payment Information: </Text>{' '}
              If you use the Service to make or receive payments, we will also
              collect certain payment information, such as credit card or other
              financial account information, and billing address.
            </Text>

            <Text style={styles.tcL}>
              {'\u2022'}{' '}
              <Text style={styles.bold}>Identity Verification: </Text> We may
              collect Personal Information, such as your date of birth or
              identification number, to validate your identity or as may be
              required by law. We may request documents to verify this
              information, such as a copy of your government-issued
              identification or photo or a billing statement.
            </Text>

            <Text style={styles.tcL}>
              {'\u2022'}{' '}
              <Text style={styles.bold}>Non-Identifying Information: </Text> We
              also may collect other information, such as zip codes, demographic
              data, information regarding your use of the Service, and general
              project-related data (“
              <Text style={styles.bold}>Non-Identifying Information</Text>”).
            </Text>

            <Text style={styles.tcP}>
              You do not have a statutory obligation to provide us with any
              information, but you may have a contractual obligation to do so,
              and if we do not receive certain information from you, then we
              will not be able to provide our Service to you
            </Text>

            <Text style={styles.blueTitle}>
              2. Information Obtained from Third Party
            </Text>
            <Text style={styles.tcP}>
              We also may receive information about you from third parties such
              as when other Users share your contact information or in
              connection with a co-marketing agreement, or at your request.
            </Text>

            <Text style={styles.blueTitle}>
              3. Information Automatically Collected
            </Text>
            <Text style={styles.tcP}>
              This information may include, among other information, the browser
              and operating system you are using, the URL or advertisement that
              referred you to the Service, the search terms you entered into a
              search engine that led you to the Service, areas within the
              Service that you visited, which links you clicked on, which pages
              or content you viewed and for how long, other similar information
              and statistics about your interactions, such as content response
              times, download errors and length of visits to certain pages and
              other information commonly shared when browsers communicate with
              websites. We may combine this automatically collected log
              information with other information we collect about you. We do
              this to improve services we offer you, and to improve marketing,
              analytics, and site functionality. {'\n\n'}
              It also includes device identifiers, cookie data, web beacons,
              embedded scripts, Internet Service Providers and data from device
              settings.{'\n\n'}
              We may collect information about a Service Provider’s work on a
              project for a Customers.
            </Text>

            <Text style={styles.blueTitle}>
              How Do We Use Information Collected?
            </Text>
            <Text style={styles.tcL}>
              {'\u2022'}{' '}
              <Text style={styles.bold}>
                To provide and improve the Service
              </Text>
              , complete your transactions, address your inquiries, process your
              registration, verify the information you provide is valid, and for
              compliance and internal business purposes.
            </Text>

            <Text style={styles.tcL}>
              {'\u2022'}{' '}
              <Text style={styles.bold}>
                To contact you with administrative communications,
              </Text>
              marketing or promotional materials and other information that may
              be of interest to you. If you decide at any time that you no
              longer wish to receive such communications from us, you can
              opt-out.
            </Text>

            <Text style={styles.tcL}>
              {'\u2022'}{' '}
              <Text style={styles.bold}>To provide personalised service</Text>
              tailored for you.
            </Text>

            <Text style={styles.tcL}>
              {'\u2022'}{' '}
              <Text style={styles.bold}>
                To enforce and comply with the law,
              </Text>
              including to conduct an investigation, to protect the property and
              rights of KeyedIn or a third party, to protect the safety of the
              public or any person, or to prevent or stop activity we may
              consider to be, or to pose a risk of being, illegal, fraudulent,
              unethical or legally actionable.
            </Text>

            <Text style={styles.tcL}>
              {'\u2022'}{' '}
              <Text style={styles.bold}>
                For the purposes disclosed at the time you provide your
                information,
              </Text>
              with your consent.
            </Text>

            <Text style={styles.blueTitle}>
              How Do We Share this Information?
            </Text>
            <Text style={styles.tcP}>
              We may share information about you to provide the Services, for
              legal and investigative purposes, in connection with sweepstakes
              and promotions, or if we are part of a merger or acquisition. We
              may also share non-identifying information with third parties, but
              we do not share Personal Information with third parties for
              marketing purposes. We may also share the information we have
              collected about you, including Personal Information, as disclosed
              at the time you provide your information, with your consent, as
              otherwise described in this Privacy Policy, or in the following
              circumstances:
            </Text>

            <Text style={styles.tcL}>
              {'\u2022'}{' '}
              <Text style={styles.bold}>
                Information about Service Providers Shared with Customers:
              </Text>
              We share information regarding Service Providers who have entered
              into contract with Customers. If a Service Provider is suspended
              from the KeyedIn Service, we may share that information with
              Customers for whom that Service Provider has worked or submitted
              proposals for work. We may also share information with Agencies to
              whom Service Providers are associated for a work project. If you
              choose to view a job post or submit a proposal for work as a
              Service Provider via the Service, we may share relevant
              information with the applicable Customer(s), including, but not
              limited to, the information contained in your Service Provider
              Profile.
            </Text>

            <Text style={styles.tcL}>
              {'\u2022'}{' '}
              <Text style={styles.bold}>
                Information about Customers Shared with Service Providers:
              </Text>
              If you have entered into a Service Contract or agreed to, we may
              provide the other user with your name, company address, billing
              address, in order to complete the transaction or to facilitate the
              resolution of a claim or dispute. The User receiving your
              information is not allowed to use it for purposes unrelated to the
              transaction, unless you have expressly consented to it.
            </Text>

            <Text style={styles.tcL}>
              {'\u2022'} <Text style={styles.bold}>Service Providers: </Text>
              We may employ third party companies and individuals to facilitate
              our Service, to provide the Service on our behalf, to perform
              Service-related services (e.g., without limitation, maintenance
              services, database management, web analytics and online
              advertising, payment processing, fraud detection and improvement
              of KeyedIn’s features) or to assist us in analysing how our
              Service is used. These third parties may have access to your
              Personal Information in order to perform these tasks on our
              behalf.
            </Text>

            <Text style={styles.tcL}>
              {'\u2022'}{' '}
              <Text style={styles.bold}>
                Legal and Investigative Purposes:{' '}
              </Text>
              KeyedIn may share information as required by law or by a Court of
              competent jurisdiction, to meet national security or law
              enforcement requirements. We cooperate with government and law
              enforcement officials and private parties to enforce and comply
              with the law with as much disclosure as is necessary to (a)
              protect the property and rights of KeyedIn or a third party, (b)
              protect the safety of the public or any person, or (c) prevent or
              stop activity we may consider to be, or pose a risk of being,
              illegal, fraudulent, unethical or legally actionable activity.
            </Text>

            <Text style={styles.tcL}>
              {'\u2022'}{' '}
              <Text style={styles.bold}>Internal and Business Transfers: </Text>
              KeyedIn may sell, transfer, or otherwise share some or all of our
              assets, including your Personal Information, in connection with a
              merger, acquisition, reorganization or sale of assets (including,
              in each case, as part of the due-diligence process with any
              potential acquiring entity) or in the event of bankruptcy.
            </Text>

            <Text style={styles.blueTitle}>
              What Controls do You Have After You Share Information?
            </Text>
            <Text style={styles.tcP}>
              We provide you with the ability to access, rectify, port and
              delete your data. You are responsible for maintaining the accuracy
              of the information you submit to us. You may request access to or
              correction of any Personal Information we have about you or close
              your account and/or request deletion of all Personal Information
              we have about you. If your information is deleted, then your
              account may become deactivated. If your account is deactivated or
              you ask to close your account, you will no longer be able to use
              the Service.
            </Text>

            <Text style={styles.blueTitle}>
              How is your Information Protected?
            </Text>
            <Text style={styles.tcP}>
              We take a number of steps to protect your data and we strive to
              maintain security of your Personal Information, but we cannot
              ensure and do not warrant the security of any information you
              transmit to us, no security is guaranteed. We will endeavour to
              reach out to you in case of a security breach.
              {'\n\n'}We'll notify you before we make changes to this Policy and
              give you the opportunity to review the revised Policy before you
              choose to continue using our Products.
            </Text>
          </ScrollView>

          <TouchableOpacity
            disabled={!this.state.accepted}
            onPress={() => {
              // alert("Privacy Read")
              this.props.privacyModalActive(false);
            }}
            style={this.state.accepted ? styles.button : styles.buttonDisabled}>
            <Text style={styles.buttonLabel}>Accept</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const {width, height} = Dimensions.get('window');

const styles = {
  container: {
    // marginTop: 20,
    // marginLeft: 10,
    // marginRight: 10,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    flex: 1,
    padding: 30,
    paddingTop: HEADER_HEIGHT - 30,
  },
  bold: {
    fontWeight: '600',
  },
  blueTitle: {
    color: '#284386',
    fontWeight: '400',
    marginTop: 10,
    // marginBottom: ,
    fontSize: 13,
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    alignSelf: 'center',
  },
  tcP: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
  },
  tcP: {
    marginTop: 10,
    fontSize: 12,
  },
  tcL: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
  },
  tcContainer: {
    marginTop: 15,
    marginBottom: 15,
    height: height * 0.7,
  },

  button: {
    backgroundColor: '#136AC7',
    borderRadius: 5,
    padding: 10,
  },

  buttonDisabled: {
    backgroundColor: '#999',
    borderRadius: 5,
    padding: 10,
  },

  buttonLabel: {
    fontSize: 14,
    color: '#FFF',
    alignSelf: 'center',
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyModal);
