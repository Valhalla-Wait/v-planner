import { useEffect } from "react";
import { useParams } from "react-router-dom";
import VendorUpdateAboutCompanyForm from "../../components/Forms/Vendor/VendorUpdateAboutCompanyForm";
import VendorUpdateCompanyInformationForm from "../../components/Forms/Vendor/VendorUpdateCompanyInformationForm";
import VendorUpdatePersonalInfarmationForm from "../../components/Forms/Vendor/VendorUpdatePersonalInfarmationForm";
import VendorUpdatePhotoAndVideoForm from "../../components/Forms/Vendor/VendorUpdatePhotoAndVideoForm";
import VendorUpdateServiceDetailsForm from "../../components/Forms/Vendor/VendorUpdateServiceDetailsForm";
import VendorUpdateSocialNetvorksForm from "../../components/Forms/Vendor/VendorUpdateSocialNetvorksForm";
import Security from "../../components/Security";
import { connect, useSelector } from "react-redux";

function VendorAccount({ vendorData }) {
  const { id } = useParams();
  console.log(vendorData, 'vendorData');
  useEffect(() => {
    const selector = document.querySelector(`[data-to="${id}"]`);
    if (!selector) return;

    const { offsetTop } = selector;

    window.scrollTo({
      top: offsetTop - 80,
      behavior: "smooth",
    });
  }, [id]);

  return (
    <section className="account">
      <VendorUpdatePersonalInfarmationForm
        name={vendorData.firstName}
        surname={vendorData.surname}
        mail={vendorData.email}
        img={vendorData.vendorModel.photos[0].name}
        phone={vendorData.phoneNumber}
      />
      <VendorUpdateCompanyInformationForm
        name={vendorData.vendorModel.companyName}
        amount={vendorData.vendorModel.companyName}
        img={vendorData.vendorModel.photos[1].name}
        country={vendorData.city}
      />8
      <VendorUpdateServiceDetailsForm />
      <VendorUpdateAboutCompanyForm
        title={vendorData.companyTitle}
        description={vendorData.companyDescription}
        aboutCompany={vendorData.aboutCompany}
        aboutTeam={vendorData.aboutTeam}
        img={vendorData.companyAvatar}
      />
      <VendorUpdatePhotoAndVideoForm />
      <VendorUpdateSocialNetvorksForm
        instagram={vendorData.vendorModel.instagram}
        facebook={vendorData.vendorModel.facebook}
        twitter={vendorData.vendorModel.twitter}
        youtube={vendorData.vendorModel.youtube}
        tiktok={vendorData.vendorModel.tiktok}
      />
      <Security />
    </section>
  );
}
const mapStateToProps = function (state) {
  return {
    vendorData: state.userInfo.userData,

  };
};
export default connect(mapStateToProps)(VendorAccount);