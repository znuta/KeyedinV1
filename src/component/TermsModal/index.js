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
import {
  TERMS_MODAL_ACTIVE,
  PRIVACY_MODAL_ACTIVE,
} from 'src/redux/action-types';
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
    termsModalActive: state =>
      dispatch({type: TERMS_MODAL_ACTIVE, state: state}),
    privacyModalActive: state =>
      dispatch({type: PRIVACY_MODAL_ACTIVE, state: state}),
  };
};

class TermsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accepted: false,
    };
  }

  render() {
    return (
      <Modal
        isVisible={this.props.ui.termsModalActive}
        style={{flex: 1, margin: 0, backgroundColor: 'white'}}>
        <View style={styles.container}>
          <Text style={styles.title}>Terms of Service</Text>
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
              KeyedIn provides a platform for customers and service providers to
              build communities, find themselves and to transact business
              directly with each other. Through the use of the App, service
              providers may be notified of customers seeking the services that
              they offer, and customers may be notified of service providers
              offering the services that they seek. We offer you a personalised
              experience and use the data that we have to make suggestions for
              you and others in helping you achieve your business goals. The
              Terms of Service contained herein governs your use of the App and
              Services and your engagements on the KeyedIn Community.
            </Text>
            <Text style={[styles.tcP, styles.bold]}>
              THE USER AGREEMENT, THE TERMS OF USE AND ALL OTHER POLICIES
              REFERENCED HEREIN AND CONTAINED BELOW SHOULD BE READ TOGETHER AS
              THE ‘TERMS OF SERVICE.’ THEY HIGHLIGHT USER RIGHTS, REMEDIES AND
              OBLIGATIONS AS WELL AS VARIOUS LIMITATIONS AND EXCLUSIONS. YOU
              UNDERSTAND THAT BY DOWNLOADING, INSTALLING, OR OTHERWISE ACCESSING
              OR USING KEYEDIN, YOU AGREE THAT YOU HAVE READ, UNDERSTOOD, AND
              AGREED TO BE BOUND BY THE TERMS OF SERVICE. IF YOU DO NOT AGREE,
              YOU MAY NOT USE KEYEDIN. IF YOU AGREE TO THE TERMS OF SERVICE ON
              BEHALF OF AN ENTITY OR AGENCY, OR IN CONNECTION WITH PROVIDING OR
              RECEIVING SERVICES ON BEHALF OF AN ENTITY OR AGENCY, YOU REPRESENT
              AND WARRANT THAT YOU HAVE THE AUTHORITY TO BIND THAT ENTITY OR
              AGENCY TO THE TERMS OF SERVICE AND AGREE THAT YOU ARE BINDING BOTH
              YOU AND THAT ENTITY OR AGENCY TO THE TERMS OF SERVICE. IN THAT
              EVENT, “YOU” AND “YOUR” WILL REFER AND APPLY TO YOU AND THAT
              ENTITY OR AGENCY. KEYEDIN MAY, IN ITS SOLE DISCRETION, AMEND THIS
              AGREEMENT AND THE OTHER TERMS OF SERVICE AT ANY TIME BY POSTING A
              REVISED VERSION ON THE APP. KEYEDIN WILL PROVIDE REASONABLE
              ADVANCE NOTICE OF ANY AMENDMENT THAT INCLUDES A SUBSTANTIAL
              CHANGE, BY POSTING THE UPDATED TERMS OF SERVICE ON THE APP,
              PROVIDING NOTICE ON THE APP, AND/OR SENDING YOU NOTICE BY EMAIL.
              USER AGREEMENT
            </Text>
            <Text style={styles.tcP}>
              This User Agreement (this “Agreement”) is a contract between you
              (“you” or “User”) and KeyedIn Service Providers (“KeyedIn,” “we,”
              or “us”). You agree to use the KeyedIn application and community
              on the terms contained herein. If you do not accept the terms of
              service in its entirety, you must not access or use the App or the
              App services. Any subsequent revisions to the Terms of Service
              will take effect on the noted effective date. This Agreement
              includes and hereby incorporates by reference the following
              important agreements, as they may be in effect and modified from
              time to time: Terms of Use, Cookie policy, Privacy Policy and any
              other agreements and policies that may be added from time to time.
              These agreements are collectively, with this Agreement, called the
              “Terms of Service”.
            </Text>
            <Text style={styles.blueTitle}>1. Accounts</Text>
            <Text style={styles.blueTitle}>1. Eligibility</Text>
            <Text style={styles.tcP}>
              You must be a legal entity, or a person aged 18 years or older to
              open an account on KeyedIn; you must have full capacity to form
              legally binding contracts within the jurisdiction in which you are
              conducting business. KeyedIn offers the App and services for
              business purposes, to connect service providers with Customers,
              not for personal use. To register and to use the services, you
              represent that:
            </Text>

            <Text style={styles.tcL}>
              {'\u2022'} You will use the account for business purposes only.
            </Text>
            <Text style={styles.tcL}>
              {'\u2022'} You will comply with any licensing, authorisation,
              registration requirement or any other requirement with respect to
              your business or the business for which you are acting.
            </Text>
            <Text style={styles.tcL}>
              {'\u2022'} When you act on behalf of an entity or independent
              business (sole proprietor, partnership or corporation), you are
              fully authorised to do so.
            </Text>
            <Text style={styles.tcL}>
              {'\u2022'} Your use of any information or materials on this
              website is entirely at your own risk, for which we shall not be
              liable. It shall be your own responsibility to ensure that any
              products, services or information available through this website
              meet your specific requirements.
            </Text>

            <Text style={styles.blueTitle}>2. Registration</Text>
            <Text style={styles.tcP}>
              By registering for an account to use KeyedIn (an “Account”) and by
              using the App services you agree to abide by the Terms of Service.
              You must register an account to use KeyedIn services. KeyedIn
              reserves the right to decline a registration or to add an Account
              of any type (i.e., as a Customer or Service provider), for any
              lawful reason. If you create an Account as an employee or agent on
              behalf of a company, you represent and warrant that you are
              authorized to enter into binding contracts, including the Terms of
              Service, on behalf of yourself and the company. KeyedIn will
              handle your information in accordance with our Privacy Policy and
              applicable privacy laws.
            </Text>

            <Text style={styles.blueTitle}>3. Account Profile</Text>
            <Text style={styles.tcP}>
              Upon registration, you will complete a User profile (“Profile”).
              You hereby consent that such profile will be shown to other Users
              and unless you change your privacy settings, it will be available
              to the public upon a search. You undertake to provide correct and
              complete information on your Profile and on all the forms you
              access on the App and to ensure that such information remains true
              and up to date at all times. You agree to not provide any false or
              misleading information about your identity or location, your
              business, your skills, or the services your business provides and
              to correct any such information that is or becomes false or
              misleading. We reserve the right to revoke the privileges of the
              Account or access to or use of the App or App Services, and those
              of any and all linked Accounts without warning if, in our sole
              discretion, false or misleading information has been provided in
              creating, marketing, or maintaining your Profile or Account. You
              authorize KeyedIn, directly or through third parties, to make any
              inquiries necessary to validate your identity, your location, and
              confirm your ownership of your email address or financial
              accounts, subject to applicable law. When requested, you must
              timely provide us with complete information and documentation
              about yourself and your business.
            </Text>

            <Text style={styles.blueTitle}>4. Types</Text>
            <Text style={styles.tcP}>
              You are allowed to open both a Customer account and a Service
              Provider account. The application settings may permit you to open
              either using the same username and passwords or require that you
              create a new username and password.
            </Text>

            <Text style={styles.blueTitle}>5. Permissions</Text>
            <Text style={styles.tcP}>
              You agree to not request or allow another person to create an
              Account on your behalf, for your use, or for your benefit, except
              that an authorized employee or agent may create an Account on
              behalf of your business. By granting other Users permissions under
              your Account, you agree that such person is permitted to act on
              your behalf and that you will bear full responsibility and
              liability for their actions, omissions and obligations.
            </Text>

            <Text style={styles.blueTitle}>6. Usernames and password</Text>
            <Text style={styles.tcP}>
              You are solely and entirely responsible for safeguarding and
              keeping your username and password confidential. You agree not to
              share them with any person who is not authorized to use your
              Account and you authorize KeyedIn to assume that any person using
              the App with your username and password, is either you or is
              authorized by you. You agree to promptly notify KeyedIn if you
              suspect or become aware of any unauthorized use of your Account or
              any unauthorized access to the password for any Account. You
              further agree not to use the Account or log in with the username
              and password of another User of the App if you are not authorized
              to use both or if the use would violate the Terms of Service.
            </Text>

            <Text style={styles.blueTitle}>2. Relationships</Text>
            <Text style={styles.blueTitle}>1. Relationship with KeyedIn</Text>
            <Text style={styles.tcP}>
              Through the use of the App, Service Providers may be notified of
              Customers seeking the services that they offer and Customers may
              be notified of Service Providers offering the services that they
              seek, however, KeyedIn does not introduce Service Providers to
              Customers or Customers to Service Providers. You hereby
              acknowledge and agree that if you decide to enter into a Service
              Contract, it is a contract directly between you and the other User
              and KeyedIn will not be a party to that contract. You agree that
              you are solely responsible, without limit, for ensuring accuracy,
              validity and legality of all User content, taking steps to
              determine the suitability of the other party for a Service
              Contract, negotiating and executing any terms and conditions of
              Service Contracts and performing services or paying for requested
              services. KeyedIn does not, in any way, guarantee the accuracy of
              any User information and does not perform any background checks on
              Users. You agree that KeyedIn does not supervise, control or
              direct the performance of any Service Provider and is not in any
              way responsible for any Project. You agree not to hold KeyedIn
              responsible for, the quality, safety, or legality of service
              provided by Service Providers; the qualifications, background, or
              identities of Users; the ability of Service Providers to deliver
              as promised and the ability of Customers to pay for services.
              KeyedIn plays no part in determining what projects Service
              Providers accept, the prices they charge for them or the working
              schedule. KeyedIn will have no obligation or liability under your
              Service Contracts, KeyedIn will not supervise or direct Projects,
              impose deadlines or quality standards, or otherwise involve itself
              with Projects and Service Contracts. Parties are to dictate the
              terms of services contracted. Service Providers will be paid as
              agreed with a Customer in a given Service Contract. As a Service
              Provider, you understand and agree that you are not an employee,
              affiliate or representative of KeyedIn in any way. Hence, KeyedIn
              will not in any way, provide or guarantee you payment of a regular
              salary or any payment. KeyedIn will not provide you with training,
              equipment, labour, premises or materials related to perform your
              obligations under any Service Contract. You are solely and fully
              liable for any employee, subcontractor or assignee acting on your
              behalf.
            </Text>

            <Text style={styles.blueTitle}>
              2. Contractual relationship between Customers and Service
              Providers (Service Contracts)
            </Text>
            <Text style={styles.tcP}>
              When you enter into a Service Contract with another User, a
              contractual relationship is created directly between you and them.
              You have complete discretion as to who you are entering into a
              Service Contract with and the terms of such contract. You may set
              forth any written or verbal agreement with another User, provided
              that they do not conflict with the Terms of Service and the
              Community Guidelines. You acknowledge, agree and understand that
              KeyedIn is not a party to any Service Contract, that the formation
              of a Service Contract between Users will not, under any
              circumstance, create an employment or other service relationship
              between KeyedIn and any User or a partnership or joint venture
              between KeyedIn and any User. Users are responsible for complying
              with all applicable laws, rules, and regulations including tax
              liability, insurance requirements and remittance to appropriate
              authorities. Nothing in this Agreement is intended to or should be
              in any way construed to create a partnership, joint venture,
              franchisor/franchisee or employer-employee relationship between
              KeyedIn and a User. Customers are solely responsible for and have
              complete discretion with regard to selection of any Service
              Provider, determining how Service Provider should be engaged and
              engaging them accordingly, in compliance with applicable laws,
              regulations, and rules.
            </Text>

            <Text style={styles.blueTitle}>3. Dispute among Users</Text>
            <Text style={styles.tcP}>
              If disputes arise between you and another User, you agree to abide
              by the dispute process contained in your Service Contract, if any.
              If that dispute process does not resolve your dispute, you may
              seek legal redress or other forms of dispute resolution of your
              own volition. You agree that KeyedIn is not under any
              responsibility or obligation to intervene in any way in this
              process. You agree also that KeyedIn shall not at any time be a
              party to your dispute. If a User seeks to obtain an order of a
              Court of competent jurisdiction which directs KeyedIn to take or
              refrain from taking any action, such user must notify KeyedIn at
              least 5 working days in advance of Hearing and must include in
              such that all amounts to which KeyedIn is entitled would be fully
              paid and KeyedIn would be reasonably compensated for the cost of
              services rendered pursuant to the order. Regardless of the
              foregoing, Users should report to KeyedIn, the activities of other
              Users who are in violation of the Terms of Service and Community
              Guidelines.
            </Text>

            <Text style={styles.blueTitle}>4. Confidential information</Text>
            <Text style={styles.tcP}>
              Users have an obligation to safeguard and keep confidential all
              information of other Users that come into their knowledge in the
              course of transacting business together. Upon written request, the
              receiving party of Confidential and personal Information will
              promptly destroy or return them to the disclosing party. Receiving
              party shall also destroy any and all copies thereof contained in
              or on its premises, systems, or any other equipment otherwise
              under its control.
            </Text>

            <Text style={styles.blueTitle}>3. Fees and Payment Terms</Text>
            <Text style={styles.tcP}>
              KeyedIn does not charge a fee for the use of the App or its
              services but there might be optional in-App purchases. Any and all
              claims for refunds from KeyedIn should be made within 30 days of
              payment. KeyedIn does not introduce Customers to Service Providers
              and does not help Service Providers secure work. While there are
              no charges for App downloads, KeyedIn charges a commission per
              transaction carried out through the App. This charge is deducted
              upon successful completion of the transaction at source before
              being dispersed to service providers.
            </Text>

            <Text style={styles.blueTitle}>
              1. Customer payments on Service Contracts
            </Text>
            <Text style={styles.tcP}>
              Service Provider will invoice Customer for service charge through
              KeyedIn, and Customer will pay invoices consistent with Service
              Contract and Terms of Service. Payment for Service Contracts will
              be made through third party payment systems on the App. There will
              be no exchange of cash, or payments outside of the App. Customers
              may maintain a wallet system on the App for disbursement of fees
              to the Service Provider. KeyedIn shall charge no fees for use of
              this feature.
            </Text>

            <Text style={styles.blueTitle}>2. Non-payment</Text>
            <Text style={styles.tcP}>
              If the Customer fails to pay the Service Provider fees or any
              other amounts when due under the Terms of Service, or a written
              agreement for payment terms incorporating the Terms of Service,
              KeyedIn will be entitled to the remedies described herein, in
              addition to such other remedies that may be available under
              applicable law or in such written agreement. For the avoidance of
              doubt, Customer will be deemed to be in default on the earliest
              occurrence of any of the following: (a) Customer fails to pay the
              Service Provider Fees when due; (b) Customer fails to pay a
              balance that is due or to rectify, within a reasonable period of
              time after accrual of the charge, a transaction aborted because a
              credit or debit card is declined or expired; (c) Customer fails to
              pay an invoice issued to the Customer by KeyedIn within the time
              period agreed or, if no period is agreed, within 30 days; (d)
              Customer initiates a chargeback with a bank or other financial
              institution resulting in a charge made by KeyedIn for Service
              Provider Fees or such other amount due being reversed to the
              Customer; or (e) Customer takes other actions or fails to take any
              action that results in a negative or past-due balance on the
              Customer’s account. If Customer is in default, KeyedIn may,
              without notice, temporarily or permanently close Customer’s
              Account and revoke Customer’s access, including Customer’s
              authority to use the App to process any additional payments, enter
              into Service Contracts, or obtain any additional Service Provider
              services from other Users through the App. However, Customers will
              remain responsible for any amounts that accrue on any ongoing
              transaction at the time a limitation is put on the Customer’s
              Account as a result of the default. Without prejudice to other
              available remedies, Customer must pay KeyedIn upon demand for any
              amounts owed, plus interest on the outstanding amount at the
              prevailing market rate plus legal fees and other costs of
              collection to the extent permitted by applicable law. KeyedIn may
              make appropriate reports to credit reporting agencies and law
              enforcement authorities; and cooperate with them in any
              investigation or prosecution. KeyedIn does not guarantee that
              Customer is able to pay or will pay Service Provider Fees and
              KeyedIn is not liable for Service Provider fees if Customer is in
              default. Service Providers may use the dispute process as
              described in the Service Contract in order to recover fees from
              Customers in the event of a default or may pursue such other
              remedies against Customer as they choose. If KeyedIn recovers fees
              from a Customer in default KeyedIn will disburse any portion
              attributable to Service Provider Fees to the applicable Service
              Provider to the extent not already paid by Customer or credited by
              KeyedIn.
            </Text>

            <Text style={styles.blueTitle}>4. Warranty Disclaimer</Text>
            <Text style={styles.tcP}>
              YOU AGREE NOT TO RELY ON THE APP, THE APP SERVICES, ANY
              INFORMATION ON THE APP OR THE CONTINUATION OF THE APP. THE APP AND
              THE APP SERVICES ARE PROVIDED “AS IS” AND ON AN “AS AVAILABLE”
              BASIS. KEYEDIN MAKES NO REPRESENTATIONS OR WARRANTIES WITH REGARD
              TO THE APP, THE APP SERVICES, WORK PRODUCT, USER CONTENT, OR ANY
              ACTIVITIES OR ITEMS RELATED TO THIS AGREEMENT OR THE TERMS OF
              SERVICE. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW,
              KEYEDIN DISCLAIMS ALL EXPRESS AND IMPLIED CONDITIONS,
              REPRESENTATIONS, AND WARRANTIES INCLUDING, BUT NOT LIMITED TO, THE
              WARRANTIES OF MERCHANTABILITY, ACCURACY, FIT FOR A PARTICULAR
              PURPOSE, TITLE, AND NON-INFRINGEMENT.
            </Text>

            <Text style={styles.blueTitle}>5. Limitation of Liability</Text>
            <Text style={styles.tcP}>
              KeyedIn is not liable, and you agree not to hold us responsible,
              for any damages or losses arising out of or in connection with the
              Terms of Service, including, but not limited to: Your use of or
              your inability to use our App or App Services; delays or
              disruptions in our App or App Services; viruses or other malicious
              software obtained by accessing, or linking to our App or App
              Services; glitches, bugs, errors, or inaccuracies of any kind in
              our App or App Services; damage to your hardware device from the
              use of the App or App Services; the content, actions, or inactions
              of third parties’ use of the App or App Services; a suspension or
              other action taken with respect to your Account; your reliance on
              the quality, accuracy, or reliability of job postings, Profiles,
              ratings, recommendations, and feedback (including their content,
              order, and display), Composite Information, or metrics found on,
              used on, or made available through the App; and your need to
              modify practices, content, or behaviour or your loss of or
              inability to do business, as a result of changes to the Terms of
              Service. IN NO EVENT WILL KEYEDIN, OUR AFFILIATES, OR OUR
              THIRD-PARTY SERVICE PROVIDERS BE LIABLE FOR ANY GENERAL, SPECIAL,
              CONSEQUENTIAL, INCIDENTAL, PUNITIVE, EXEMPLARY, OR INDIRECT COSTS
              OR DAMAGES, INCLUDING, BUT NOT LIMITED TO, LITIGATION COSTS,
              INSTALLATION AND REMOVAL COSTS, OR LOSS OF DATA, PRODUCTION,
              PROFIT, OR BUSINESS OPPORTUNITIES. THE LIABILITY OF KEYEDIN, OUR
              AFFILIATES AND OUR THIRD-PARTY SERVICE PROVIDERS TO ANY USER FOR
              ANY CLAIM ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT OR
              THE OTHER TERMS OF SERVICE, IF ANY, WILL NOT EXCEED ACTUAL COSTS
              OR SPECIAL DAMAGES. THESE LIMITATIONS WILL APPLY TO ANY LIABILITY,
              ARISING FROM ANY CAUSE OF ACTION WHATSOEVER ARISING OUT OF OR IN
              CONNECTION WITH THIS AGREEMENT OR THE OTHER TERMS OF SERVICE,
              WHETHER IN CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT
              LIABILITY, OR OTHERWISE, EVEN IF ADVISED OF THE POSSIBILITY OF
              SUCH COSTS OR DAMAGES AND EVEN IF THE LIMITED REMEDIES PROVIDED
              HEREIN FAIL OF THEIR ESSENTIAL PURPOSE.
            </Text>

            <Text style={styles.blueTitle}>6. Release</Text>
            <Text style={styles.tcP}>
              In addition to the recognition that KeyedIn is not a party to any
              contract between Users, you hereby release KeyedIn, our
              Affiliates, and our respective officers, directors, agents,
              subsidiaries, joint ventures, employees and service providers from
              claims, demands, and damages (actual and consequential) of every
              kind and nature, known and unknown, arising out of or in any way
              connected with any dispute you have with another User, whether it
              be at law or in equity that exist as of the time you enter into
              this Agreement. This release includes, for example and without
              limitation, any disputes regarding the performance, functions, and
              quality of the Service Provider Services provided to Customer by a
              Service Provider and requests for refunds based upon disputes.
              This release will not apply to a claim that KeyedIn failed to meet
              our obligations under the Terms of Service.
            </Text>

            <Text style={styles.blueTitle}>7. Indemnification</Text>
            <Text style={styles.tcP}>
              You will indemnify, defend, and hold harmless KeyedIn, our
              Affiliates, and our respective directors, officers, employees,
              representatives, and agents (each an “Indemnified Party”) for all
              Indemnified Claims (defined below) and Indemnified Liabilities
              (defined below) relating to or arising out of: (a) the use of the
              App and the App Services by you or your agents, including any
              payment obligations or default incurred through use of the App
              Services; (b) any Work Product or User Content developed,
              provided, or otherwise related to your use of the App Services;
              (c) any Service Contract entered into by you or your agents; (d)
              failure to comply with the Terms of Service by you or your agents;
              (e) failure to comply with applicable law by you or your agents;
              (f) negligence, wilful misconduct, or fraud by you or your agents;
              and (g) defamation, libel, violation of privacy rights, unfair
              competition, or infringement of Intellectual Property Rights or
              allegations thereof to the extent caused by you or your agents.
              For purposes of this Section, your agents includes any person who
              has apparent authority to access or use your account demonstrated
              by using your username and password. “Indemnified Claim” means any
              and all claims, damages, liabilities, costs, losses, and expenses
              (including reasonable legal fees and all related costs and
              expenses) arising from or relating to any claim, suit, proceeding,
              demand, or action brought by you or a third party or other User
              against an Indemnified Party. “Indemnified Liability” means any
              and all claims, damages, liabilities, costs, losses, and expenses
              (including reasonable legal fees and all related costs and
              expenses) arising from or relating to any claim, suit, proceeding,
              demand, or action brought by an Indemnified Party against you or a
              third party or other User.
            </Text>

            <Text style={styles.blueTitle}>
              8. Agreement Term and Termination
            </Text>

            <Text style={styles.blueTitle}>1. Termination</Text>
            <Text style={styles.tcP}>
              Unless both you and KeyedIn expressly agree otherwise in writing,
              either party may terminate this Agreement in our sole discretion,
              at any time, without explanation, upon written notice to the
              other, which will result in the termination of the other Terms of
              Service as well, except as otherwise provided herein. In the event
              you properly terminate this Agreement, your right to use the App
              and App Services is automatically revoked, and your Account will
              be closed. KeyedIn is not a party to any Service Contract between
              Users, Consequently, User understands and acknowledges that
              termination of this Agreement does not terminate or otherwise
              impact any Service Contract or Project entered into between Users.
              If you attempt to terminate this Agreement while having one or
              more open Projects, you agree (a) you hereby instruct KeyedIn to
              close any open contracts; (b) you will continue to be bound by
              this Agreement and the other Terms of Service until all such
              Projects have closed on the App; (c) KeyedIn will continue to
              perform those App Services necessary to complete any open Project
              or related transaction between you and another User; and (d) you
              will continue to be obligated to pay any amounts accrued but
              unpaid as of the date of termination or as of the closure of any
              open Service Contracts, whichever is later, to KeyedIn for any App
              Services or such other amounts owed under the Terms of Service and
              to any Service Providers for any Service Provider Services.
              Without limiting KeyedIn’s other rights or remedies, we may, but
              are not obligated to, temporarily or indefinitely revoke or limit
              access to the App or App Services, deny your registration, or
              permanently revoke your access to the App and refuse to provide
              any or all App Services to you if: (a) you breach the letter or
              spirit of any terms and conditions of this Agreement or any other
              provisions of the Terms of Service; (b) we suspect or become aware
              that you have provided false or misleading information to us; or
              (c) we believe, in our sole discretion, that your actions may
              cause legal liability for you, our Users, or KeyedIn or our
              Affiliates; may be contrary to the interests of the App or the
              User community; or may involve illicit or illegal activity. If
              your Account is temporarily or permanently closed, you may not use
              the App under the same Account or a different Account or
              reregister under a new Account without KeyedIn’s prior written
              consent. If you attempt to use the App under a different Account,
              we reserve the right to reclaim available funds in that Account
              and/or use an available Payment Method to pay for any amounts owed
              by you to the extent permitted by applicable law. YOU AGREE AS
              FOLLOWS: IF KEYEDIN DECIDES TO TEMPORARILY OR PERMANENTLY CLOSE
              YOUR ACCOUNT, KEYEDIN HAS THE RIGHT WHERE ALLOWED BY LAW BUT NOT
              THE OBLIGATION, TO: (A) NOTIFY OTHER USERS THAT HAVE ENTERED INTO
              SERVICE CONTRACTS WITH YOU TO INFORM THEM OF YOUR CLOSED ACCOUNT
              STATUS, (B) PROVIDE THOSE USERS WITH A SUMMARY OF THE REASONS FOR
              YOUR ACCOUNT CLOSURE. YOU AGREE THAT KEYEDIN WILL HAVE NO
              LIABILITY ARISING FROM OR RELATING TO ANY NOTICE THAT IT MAY
              PROVIDE TO ANY USER REGARDING CLOSED ACCOUNT STATUS OR THE
              REASON(S) FOR THE CLOSURE.
            </Text>

            <Text style={styles.blueTitle}>2. Account Data after Close</Text>
            <Text style={styles.tcP}>
              Except as otherwise required by law, if your Account is closed for
              any reason, you will no longer have access to data, messages,
              files, or other material you keep on the App and any closure of
              your Account may involve deletion of any content stored in your
              Account for which KeyedIn will have no liability whatsoever.
              KeyedIn, in its sole discretion and as permitted or required by
              law, may retain some or all of your Account information.
            </Text>

            <Text style={styles.blueTitle}>3. Survival</Text>
            <Text style={styles.tcP}>
              After this Agreement terminates, the terms of this Agreement and
              the other Terms of Service that expressly or by their nature
              contemplate performance after this Agreement terminates or expires
              will survive and continue in full force and effect. For example,
              the provisions requiring arbitration, protecting intellectual
              property, indemnification, payment of fees, reimbursement and
              setting forth limitations of liability each, by their nature,
              contemplate performance or observance after this Agreement
              terminates. Without limiting any other provisions of the Terms of
              Service, the termination of this Agreement for any reason will not
              release you or KeyedIn from any obligations incurred prior to
              termination of this Agreement or that thereafter may accrue in
              respect of any act or omission prior to such termination.
            </Text>

            <Text style={styles.blueTitle}>9. Disputes with KeyedIn</Text>

            <Text style={styles.blueTitle}>1. Arbitration Agreement</Text>
            <Text style={styles.tcP}>
              All disputes between you and KeyedIn shall be resolved as quickly
              and promptly as possible and in accordance with the terms
              contained herein. Before serving a demand for arbitration, you and
              KeyedIn agree to first notify each other of the Claim. You and
              KeyedIn must seek informal voluntary resolution within 60 days
              from the receipt of the notice. Any Notice must include pertinent
              account information, a brief description of the Claim, and contact
              information, so that you or KeyedIn, as applicable, may evaluate
              the Claim and attempt to informally resolve the Claim. In the
              unlikely event the parties are unable to resolve a Claim within 60
              days of the receipt of the applicable Notice, you, KeyedIn, and
              our Affiliates agree that either party may refer the matter to
              arbitration. The Party referring the matter shall issue a prior
              pre-arbitration notice to the other Party stating that negotiation
              and mediation have failed to resolve the dispute and illustrating
              facts to support this conclusion, citing the issues which remain
              unresolved and its intention to refer the matter to arbitration.
              The arbitration shall be conducted in accordance with the
              provisions of the Arbitration and Conciliation Act of the Federal
              Republic of Nigeria (Cap A18 Laws of the Federation of Nigeria,
              2004) or any subsequent re-enactments and shall take place in
              Lagos, Nigeria and the proceedings shall be in the English
              language. Arbitration can also take place in other countries
              subject to the arbitration laws that guide the country. The
              arbitrator’s award shall be final and binding on all parties.
              Claims covered by this arbitration provision include, but are not
              limited to, all claims, disputes, or controversies arising out of
              or relating to this Agreement, the App, App Services, the Terms of
              Service, any Service Contract, any payments or monies you claim
              are due to you from KeyedIn or our Affiliates or successors, trade
              secrets, unfair competition, false advertising, consumer
              protection, privacy, compensation, classification, termination,
              discrimination, retaliation or harassment and all legal claims
              arising out of or relating to your relationship with KeyedIn or
              the termination of that relationship. By agreeing to the Terms,
              you agree that you are required to resolve any claim that you may
              have against KeyedIn on an individual basis in arbitration, as set
              forth in this Agreement. This will preclude you from bringing any
              class, collective, or representative action against KeyedIn, and
              also preclude you from participating in or recovering relief under
              any current or future class, collective, consolidated, or
              representative action brought against KeyedIn by someone else.
              Notwithstanding the foregoing, where you allege claims of
              violence, crime, sexual assault or sexual harassment occurring in
              connection with your use of the Services, you may elect to bring
              those claims in a court of competent jurisdiction instead of
              arbitration. KeyedIn agrees to honour your election of forum with
              respect to your crime, violence, sexual assault or sexual
              harassment claim but in so doing does not waive the enforceability
              of this Arbitration clause as to any other provision, controversy,
              claim or dispute. Nothing in this Arbitration Provision prevents
              you from making a report to or filing a claim or charge with an
              appropriate government agency or seeking other administrative
              remedies.
            </Text>

            <Text style={styles.blueTitle}>2. Choice of Law</Text>
            <Text style={styles.tcP}>
              The Terms of Service and any Claim will be governed by and
              construed in accordance with the laws of the Federal Republic of
              Nigeria, without regard to its conflict of law provisions.
            </Text>

            <Text style={styles.blueTitle}>10. Miscellaneous</Text>

            <Text style={styles.blueTitle}>1. 10.1.Entire Agreement</Text>
            <Text style={styles.tcP}>
              This Agreement, together with the other Terms of Service, sets
              forth the entire agreement and understanding between you and
              KeyedIn relating to the subject matter hereof and thereof and
              cancels and supersedes any prior or contemporaneous discussions,
              agreements, representations, warranties, and other communications
              between you and us, written or oral, to the extent they relate in
              any way to the subject matter hereof and thereof. No modification
              or amendment to the Terms of Service will be binding upon KeyedIn
              unless they are agreed in a written instrument signed by a duly
              authorized representative of KeyedIn or posted on the App by
              KeyedIn. You represent that you had ample time to review and
              decide whether to agree to the Terms of Service. If an ambiguity
              or question of intent or interpretation of the Terms of Service
              arises, no presumption or burden of proof will arise favouring or
              disfavouring you or KeyedIn because of the authorship of any
              provision of the Terms of Service.
            </Text>

            <Text style={styles.blueTitle}>2. 10.2. Waiver</Text>
            <Text style={styles.tcP}>
              Our failure to act with respect to a breach by you or others does
              not waive our right to act with respect to subsequent or similar
              breaches. We do not guarantee we will act against all breaches of
              the Terms of Service.
            </Text>

            <Text style={styles.blueTitle}>3. 10.3. Assignments</Text>
            <Text style={styles.tcP}>
              User may not assign the Terms of Service, or any of its rights or
              obligations hereunder, without KeyedIn’s prior written consent in
              the form of a written instrument signed by a duly authorized
              representative of KeyedIn. KeyedIn may freely assign this
              Agreement and the other Terms of Service without User’s consent.
              Subject to the foregoing restrictions, the Terms of Service are
              binding upon and will inure to the benefit of the successors,
              heirs, and permitted assignees of the parties.
            </Text>

            <Text style={styles.blueTitle}>4. 10.4. Severability</Text>
            <Text style={styles.tcP}>
              If and to the extent any provision of this Agreement or the other
              Terms of Service is held illegal, invalid, or unenforceable in
              whole or in part under applicable law or by a Court of competent
              jurisdiction, such provision or such portion thereof will be
              ineffective as to the jurisdiction in which it is illegal,
              invalid, or unenforceable to the extent of its illegality,
              invalidity, or unenforceability and will be deemed modified to the
              extent necessary to conform to applicable law so as to give the
              maximum effect to the intent of the parties. The illegality,
              invalidity, or unenforceability of such provision in that
              jurisdiction will not in any way affect the legality, validity, or
              enforceability of such provision in any other jurisdiction or of
              any other provision in any jurisdiction. The illegality,
              invalidity, or unenforceability of such provision shall not affect
              the legality, validity and enforceability of all other provisions.
            </Text>

            <Text style={styles.blueTitle}>5. 10.5.Force majeure</Text>
            <Text style={styles.tcP}>
              The parties to this Agreement will not be responsible for the
              failure to perform, or for any delay in performance of any
              obligation hereunder for a reasonable period due to labour
              disturbances, accidents, fires, floods, telecommunications or
              Internet failures, strikes, wars, riots, rebellions, blockades,
              acts of government, governmental requirements and regulations or
              restrictions imposed by law or any other conditions beyond the
              reasonable control of such party.
            </Text>

            <Text style={styles.blueTitle}>
              6. 10.6. Consent to use electronic records
            </Text>
            <Text style={styles.tcP}>
              In connection with the Terms of Service, you may be entitled to
              receive, or we may otherwise provide, certain records such as
              contracts, notices, and communications, in writing. To facilitate
              your use of the App and the App Services, you give us permission
              to provide these records to you electronically instead of in paper
              form.
            </Text>

            <Text style={styles.blueTitle}>11. Definitions</Text>
            <Text style={styles.tcP}>
              <Text style={styles.bold}>“Customer”</Text> means any authorized
              User using KeyedIn to seek and / or obtain Service Provider
              Services.
            </Text>
            <Text style={styles.tcP}>
              <Text style={styles.bold}>“Confidential Information”</Text> means
              any material or information provided to, or created by a User to
              evaluate a Project or the suitability of another User for the
              Project, regardless of whether the information is in tangible,
              electronic, verbal, graphic, visual, or other form. Confidential
              Information does not include material or information that: (a) is
              generally known by third parties as a result of no act or omission
              of Service Provider or Customer; (b) was lawfully received by User
              without restriction from a third party having the right to
              disseminate the information; (c) was already known by User prior
              to receiving it from the other party and was not received from a
              third party in breach of that third party’s obligations of
              confidentiality; or (d) was independently developed by User
              without use of another person’s Confidential Information.
            </Text>
            <Text style={styles.tcP}>
              <Text style={styles.bold}>“Service Provider”</Text> means any
              authorized User utilizing KeyedIn to advertise or provide Service
              Provider Services to Customers. A Service Provider is a customer
              of KeyedIn with respect to use of the App Services.
            </Text>
            <Text style={styles.tcP}>
              <Text style={styles.bold}>“Service Provider Fees”</Text> means the
              amount reflected in the invoice, the fixed fee agreed between a
              Customer and a Service Provider and any bonuses or other payments
              made by a Customer to a Service Provider.
            </Text>

            <Text style={styles.tcP}>
              <Text style={styles.bold}>“Service Provider Services”</Text> means
              all services performed for or delivered to Customers by Service
              Providers.
              {'\n\n'}
              The term <Text style={styles.bold}>“including”</Text> as used
              herein means including without limitation.
            </Text>

            <Text style={styles.tcP}>
              <Text style={styles.bold}>“Intellectual Property Rights”</Text>{' '}
              means all patent rights, copyright rights, mask work rights, moral
              rights, rights of publicity, trademark, trade dress and service
              mark rights, goodwill, trade secret rights and other intellectual
              property rights as may now exist or hereafter come into existence,
              and all applications therefore and registrations, renewals and
              extensions thereof, in each case, under all applicable laws.
            </Text>

            <Text style={styles.tcP}>
              <Text style={styles.bold}>“Payment Method”</Text> means a valid
              credit card issued by a bank acceptable to KeyedIn, a bank account
              linked to your Account, a debit card, or such other method of
              payment as KeyedIn may accept from time to time in our sole
              discretion.
            </Text>

            <Text style={styles.tcP}>
              <Text style={styles.bold}>“Project”</Text> means an engagement for
              Service Provider Services that a Service Provider provides to a
              Customer under a Service Contract on the App.
            </Text>

            <Text style={styles.tcP}>
              <Text style={styles.bold}>“Service Contract”</Text> means the
              contractual provisions between a Customer and a Service Provider
              governing the Service Provider Services to be performed by a
              Service Provider for Customer for a Project.
            </Text>

            <Text style={styles.tcP}>
              <Text style={styles.bold}>“Substantial Change”</Text> means a
              change to the Terms of Service that reduces your rights or
              increases your responsibilities.
            </Text>
            <Text style={styles.tcP}>
              <Text style={styles.bold}>“KeyedIn App”</Text> means the online
              platform accessed using KeyedIn’s downloaded application.
            </Text>

            <Text style={styles.tcP}>
              <Text style={styles.bold}>“User Content”</Text> means any
              comments, remarks, data, feedback, content, text, photographs,
              images, video, music, or other content or information that you or
              any App Visitor or User post to any part of the App or provide to
              KeyedIn, including such content or information that is posted as a
              result of questions.
            </Text>
            <Text style={styles.tcP}>
              <Text style={styles.bold}>“Work Product”</Text> means any tangible
              or intangible results or deliverables that Service Provider agrees
              to create for, or actually delivers to, Customer as a result of
              performing the Service Provider Services.
            </Text>

            <Text style={styles.bold}>TERMS OF USE</Text>
            <Text style={styles.tcP}>
              KeyedIn grants you a limited license to access the App and App
              Services, subject to compliance with the Terms of Use and theTerms
              of Service as a whole. Such license may be terminated by provision
              of notice and your access barred, where you are in default or
              violation. We try to keep our App and the App Services safe,
              secure, and functioning properly, but we cannot guarantee the
              continuous operation of or access to our Services.
            </Text>

            <Text style={styles.blueTitle}>
              Copyright and Intellectual Property
            </Text>
            <Text style={styles.blueTitle}>KeyedIn</Text>
            <Text style={styles.tcP}>
              KeyedIn shall retain all right, title, and interest in and to all
              of its Intellectual Property Rights related in and to the App and
              the App Services. Nothing in the Terms of Service grants you a
              right to use any KeyedIn Intellectual property for your own use.
            </Text>

            <Text style={styles.blueTitle}>Users</Text>
            <Text style={styles.tcP}>
              When you post User Content on the App or through the App Services
              or provide KeyedIn with User Content, you understand and
              acknowledge that you are solely responsible for such User Content.
              Further, you represent and warrant that you have the right, power,
              and authority to (a) post that User Content without violating the
              rights of third parties, and (b) grant the licenses specified
              below. You acknowledge and agree that the poster of User Content,
              and not KeyedIn, is responsible for any User Content including any
              harms caused to you, another User, or a third party by such User
              Content. You will indemnify, defend, and hold harmless KeyedIn,
              our Affiliates, and our respective directors, officers, employees,
              representatives, and agents (each an “Indemnified Party”) from any
              and all claims, damages, liabilities, costs, losses, and expenses
              (including, but not limited to, reasonable attorneys’ fees and all
              related costs and expenses) arising from or relating to any claim,
              suit, proceeding, demand, or action brought by you or a third
              party or other User against an Indemnified Party relating to or
              arising out of any User Content you post. You retain all ownership
              rights in any User Content you post on KeyedIn. To the extent
              permitted by applicable law, you also grant to KeyedIn and our
              successors and Affiliates a royalty-free, sub- licensable,
              transferable, perpetual, irrevocable, non-exclusive, worldwide
              license to use, reproduce, modify, publish, list information
              regarding, edit, translate, distribute, publicly perform, publicly
              display, and make derivative works of all such User Content and
              your name, voice, and/or likeness as contained in your User
              Content, in whole or in part, and in any form, media, or
              technology, whether now known or hereafter developed, for use in
              connection with the App and KeyedIn’s, our successors’ and
              Affiliates’ businesses, including, without limitation, for
              promoting and redistributing part or all of the App (and
              derivative works thereof) in any media formats and through any
              media channels. You also hereby grant each User and each App
              Visitor a non-exclusive license to access your User Content
              through the App and to use, reproduce, distribute, and display
              such User Content to the extent permitted through the normal
              functionality of the App and subject to all applicable
              confidentiality and other provisions of the Terms of Service, our
              Privacy Policy, and applicable law.
            </Text>

            <Text style={styles.blueTitle}>Third Party</Text>
            <Text style={styles.tcP}>
              Any information or content expressed or made available by a third
              party or any other App Visitor or User is that of the respective
              author(s) or distributor(s) and not of KeyedIn. KeyedIn neither
              endorses nor is responsible for the accuracy or reliability of any
              opinion, advice, information, or statement made on the App by
              anyone other than KeyedIn’s authorized agents acting in their
              official capacities. The App may contain links to third-party
              websites. The App may also contain applications that allow you to
              access third-party websites via the App. Such third-party websites
              or applications are owned and operated by the third parties and/or
              their licensors. The inclusion of any link or application on the
              App does not imply that we endorse the linked App or application.
              You use the links and third-party websites at your own risk and
              agree that your use of an application or third-party website
              accessed via the App is on an “as is” and “as available” basis
              without any warranty for any purpose.
            </Text>

            <Text style={styles.blueTitle}>Acceptable/ Permitted Uses</Text>
            <Text style={styles.tcP}>
              KeyedIn offers the App and App Services for your business purposes
              only and not for personal, household, or consumer use. KeyedIn
              makes the App and App Services available for Users to find one
              another and enter into service relationships. We do not make any
              representations or warranties with respect to any information that
              is posted on the App by us or anyone else. In no event should any
              content be relied on or construed as legal advice or otherwise.
              Users should independently verify the accuracy of any content.
            </Text>

            <Text style={styles.blueTitle}>Prohibited Uses</Text>
            <Text style={styles.tcP}>
              You may not use, or encourage, promote, facilitate, instruct or
              induce others to use, the App or App Services for any activities
              that violate any law, statute, ordinance or regulation; for any
              other illegal or fraudulent purpose or any purpose that is harmful
              to others; or to transmit, store, display, distribute or otherwise
              make available content that is illegal, fraudulent or harmful to
              others. The following, without limit, are examples of uses that
              are prohibited on the App or when using the App Services:
            </Text>

            <Text style={styles.tcL}>
              {'\u2022'} Seeking, offering, promoting, or endorsing and
              services, content, or activities that:
              {'\n\n'} {'\u2022'} are defamatory, illegal, profane, vulgar,
              threatening, unlawfully discriminatory, illegal, pornographic,
              obscene, or sexually explicit in nature.
              {'\n\n'} {'\u2022'} would violate the intellectual property
              rights, such as and including copyrights, of another person,
              entity, service, product, or website.
              {'\n\n'} {'\u2022'} would violate (a) KeyedIn’s Terms of Service,
              or (b) the terms of service of another website or any similar
              contractual obligations.
              {'\n\n'} {'\u2022'} regard the creation, publication, or
              distribution of “fake news”, “hoax news”, Deep Fake content or
              similar content, which is, in KeyedIn's sole discretion,
              determined to be intended to mislead recipients for personal,
              financial, political or other gain or advantage; or
              {'\n\n'} {'\u2022'} are harassing toward another person.
              {'\n\n'} {'\u2022'} Fraudulent or misleading uses or content,
              including:
              {'\n\n'} {'\u2022'} fraudulently billing or attempting to
              fraudulently bill any Customer,
              {'\n\n'} {'\u2022'} misrepresenting your experience, skills, or
              information, including by representing another person’s profile,
              or parts of another person’s profile, as your own.
              {'\n\n'} {'\u2022'} using a profile photo that misrepresents your
              identity or represents you as someone else.
              {'\n\n'} {'\u2022'} impersonating any person or entity.
              {'\n\n'} {'\u2022'} falsely stating or implying a relationship
              with another User.
              {'\n\n'} {'\u2022'} falsely stating or implying a relationship
              with KeyedIn or with another company with whom you do not have a
              relationship.
              {'\n\n'} {'\u2022'} allowing another person to use your account,
              which is misleading to other Users; or
              {'\n\n'} {'\u2022'} falsely stating that one Service Provider will
              perform the work on a job when another will in fact perform the
              work, including submitting a proposal on behalf of a Service
              Provider that is unable, unwilling, or unavailable to do the work.
              {'\n\n'} {'\u2022'} Expressing an unlawful or discriminatory
              preference in a job post or proposal.
              {'\n\n'} {'\u2022'} Breaching confidentiality by posting
              identifying information concerning another person.
              {'\n\n'} {'\u2022'} Spamming other Users with proposals or
              invitations, including by making unsolicited contact of Users off
              the KeyedIn platform, or by posting the same job multiple times so
              that more than one version remains active at a given time.
              {'\n\n'} {'\u2022'} Making or demanding bribes or other payments
              without the intention of providing services in exchange for the
              payment.
              {'\n\n'} {'\u2022'} Requesting or demanding free services,
              including requesting Service Providers to submit work as part of
              the proposal process for very little or no money or posting
              contests in which Service Providers submit work with no or very
              little pay, and only the winning submission is paid the full
              amount.
              {'\n\n'} {'\u2022'} Requesting a fee before allowing a User to
              submit a proposal.
              {'\n\n'} {'\u2022'} Attempting to or manipulating or misusing the
              feedback system, including by:
              {'\n\n'} {'\u2022'} withholding payment or Work Product or
              engaging in any other conduct for the purpose of obtaining
              positive feedback from another User.
              {'\n\n'} {'\u2022'} attempting to coerce another User by
              threatening to give negative feedback.
              {'\n\n'} {'\u2022'} expressing views unrelated to the work, such
              as political, religious, or social commentary, in the feedback
              system.
              {'\n\n'} {'\u2022'} providing anything of value to any person
              (including to a third-party who provides assistance in obtaining
              feedback) or using any service of any type in order to obtain
              feedback; or
              {'\n\n'} {'\u2022'} offering services for the sole purpose of
              obtaining positive feedback of any kind.
              {'\n\n'} {'\u2022'} Duplicating or sharing accounts.
              {'\n\n'} {'\u2022'} Selling, trading, or giving an account to
              another person without KeyedIn’s consent.
              {'\n\n'} {'\u2022'} Sharing or soliciting means of direct contact
              with or from another User either directly through messages or by
              including means of direct contact in a job post, profile, proposal
              or other User Content prior to entering into a Service Contract
              with such User, except as expressly allowed for Enterprise
              Customers;
              {'\n\n'} {'\u2022'} Directly or indirectly, advertising or
              promoting another website, product, or service or soliciting other
              Users for other websites, products, or services, including
              advertising on KeyedIn to recruit Service Providers and/or
              Customers to join an agency or another website or company.
              {'\n\n'} {'\u2022'} Interfering or attempting to interfere with
              the proper operation of the App or App Services or any activities
              conducted on the App, including by:
              {'\n\n'} {'\u2022'} Conduct or actions that could jeopardize the
              integrity of or circumvent the App, App Services or KeyedIn's
              proprietary information, including:
            </Text>

            <Text style={styles.tcP}>
              We reserve the right, without obligation, to investigate any
              potential violation of these App Terms of Use and to remove,
              disable access to, or modify any content on the App. Our failure
              to act with respect to a breach by you or others does not waive
              our right to act with respect to subsequent or similar breaches.
              We do not guarantee we will take action against all breaches of
              these Terms of Use or the User Agreement. {'\n\n'}
              If you become aware of any violation of these App Terms of Use,
              you must immediately report it. You agree to assist us with any
              investigation we undertake and to take any remedial steps we
              require in order to correct a violation of these App Terms of Use.
            </Text>
          </ScrollView>

          <TouchableOpacity
            disabled={!this.state.accepted}
            onPress={() => {
              // alert("Terms and conditions accepted")
              this.props.termsModalActive(false);
              //this.props.privacyModalActive(true);
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
    marginBottom: 5,
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

export default connect(mapStateToProps, mapDispatchToProps)(TermsModal);
