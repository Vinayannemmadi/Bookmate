import React from 'react'
import {  HomeBox, ItemsContainer} from './styledContact';
export default function Contact() {
  return (
   <HomeBox>
        <ItemsContainer> 
          <h3 style={{color:'black',margin:30}}>
          <h2>Contact Us</h2>

            <p>Got a question, feedback, or just want to say hello? We'd love to hear from you! Feel free to reach out to us using any of the methods below:</p>
            <p><strong>Email:</strong>
              For general inquiries, assistance, or feedback, drop us an email at <a href="mailto:contact@example.com">bookmate.org@gmail.com</a>. Our team is here to help and will get back to you as soon as possible.
            </p>
            <p><strong>Phone:</strong>
              Prefer to chat over the phone? Give us a call at <a href="tel:123-456-7890">+91 34223 34235</a> during our business hours, and one of our friendly representatives will be happy to assist you.
            </p>
            <p><strong>Live Chat:</strong>
              Need immediate assistance? Click on the live chat icon in the bottom corner of your screen to chat with a member of our team in real-time. We're here to help you navigate our website and answer any questions you may have.
            </p>
            <p><strong>Social Media:</strong>
              Connect with us on social media for the latest updates, book recommendations, and exclusive promotions. Follow us on <a href="https://www.facebook.com/bookmate">Facebook</a>, <a href="https://twitter.com/YourWebsite">Twitter</a>, and <a href="https://www.instagram.com/YourWebsite">Instagram</a> to stay in the loop!
            </p>
            <p><strong>Visit Us:</strong>
              If you're in the neighborhood, feel free to drop by our office at <a href="https://goo.gl/maps/yourlocation">RGUKT-Basar, Nirmal, Telangana, 504107</a> during our business hours. We'd love to meet you in person!
            </p>
            <p><strong>Feedback Form:</strong>
              Have something specific to share with us? Fill out our online feedback form <a href="/feedback">here</a> to let us know how we're doing and how we can improve your experience.
            </p>
            <p>
                No matter how you choose to get in touch, we're here to provide you with the best possible experience
                and assist you every step of the way. We look forward to hearing from you!
            </p>
          </h3>
        </ItemsContainer>
   </HomeBox>
  )
}
