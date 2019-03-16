# CSE135_HW4

## Team Members
Xinpei Tan, xit054@ucsd.edu  
Ryan Keng, rkeng@ucsd.edu  
Ye Lin, yel106@ucsd.edu

## Repo
https://github.com/YLcoding/CSE135_HW4

## Links
Report site: http://157.230.186.137:8089  
Test site: http://157.230.186.137:8090

## Account
username=thomas, password=cse135

## System Design
### User management system
- Types of users
  - Admin: can add/edit/delete users and define which reports users may see
  - Standard: can view reports  
- Login
  - After login, the user will be taken to the user profile page, where the current user’s data will be displayed. Specifically, whether the user has access to a report, will be displayed in terms of “Yes” or “No”. If the user has access to a report, a link to the report will be provided. If the user does not have access to a report, and while trying to directly visit a report by URL, the user will be redirected to the user profile page.  
- User Manager Page
  - Only admin users have access to this page. /userManager will get all users. /userManager/username will get one user whose username matches. Admins can add a new user using the “Add User” button above the table, or edit or delete a user using the “Actions” column in the table.
- Tools
  - Passport.js
    - We used the local authentication method (collect username and password).
  - MySQL
    - We used the MD5 function to hash user passwords.
  
### Visualization
We decide to use CanvasJS to do charts.  We thought about using D3 and other library. However, we don’t need very fancy charts.  The project we are doing is a very small website.  We won’t have a lot of data.  Our users probably coming from a similar background.  The charts is for us analyze the data.  It doesn’t have to be the most beautiful. CanvasJS has enough function for us to use.  Also, to reduce the cost of development, using an easy to use library like CanvasJS really help us reduce development time. 

So what we do first is pick the data we need from SQL:

```Select * from hw4.users```
	
We then convert it to array of objects that’s acceptable by CanvasJS. And insert that into 	the Json object that is used to create the chart.
```javascript
var chart = new CanvasJS.Chart("chartContainer", { 
	……….
	Data:[{
		Datapoint = {data}
	……….
});
```
This will create an chart in HTML div with an id of “chartContainer”.

### PDF Download
Pdf download is very easy,  we use a library call jspdf.  We use script tag to download the library.
Then, we get the canvas element using jqury.  We then create a function where each time a button is click, we save the canvas to jspdf then download as pdf.

### Sharing
Slack sharing: Slack sharing is very easy.  We just need to use XMLHttpRequesa() to make a POST request to /api/file.upload with file, token, and channel name.  Slack will sent that file to that channel on behalf of you.
Email sharing: Email sharing is a very hard thing to implement by ourselves.  We just use a paid service from EmailJS, but we just use the free part.  It’s easy to implement using EmailJS. We just need to connect our email to EmailJS, than we can make a post call using the library they provided with any template string you defined.  Just one call.  But we cannot attach image onto our email.  We need to paid to have that service.  So, we just send the raw data in our email.

## Report Decisions
### Browser Report Page:
/report/browser

We decided to use pie chart for display users browser information is because we can see how much one type of browser is differ than other types of browser.  Since the types of  browsers people is a very small set, pie chart can have a good representation for each type.  Although pie chart can only display so much information, but it has enough information that we needed.  The trade off here is that we could make the graph more complicated by using bar chart, but we don’t care about how many people are using any type of browser.  We just want to see the percentages.  It makes the graph very clean and simple.

### Device Report Page:
/report/device

We decided to use pie chart for display users device information is because we can see how much one type of device is differ than other types of device. We are using a framework to detect users’ device type and only mobile device can be detected and others will be shown if can’t detect users’ device type. Using a pie chart can help us directly notice how many different types of devices and each device’s proportion.

### Error Report Page:
/report/error

We decided to use bar charts to display the error rates in different path so that it’s intuitive and it directly shows which day and which path has higher error rates. By hovering on each bar, all the error rates are clearly displayed. In terms of error, we wish to know when did the error rate goes up or down? did the error rate when up after we publish the newest version of the site? After we changed some code on the website, does new bug got generated? It’s hard for us to test about them because we are not users.  So we collect these data so users can help us identify the problem.  This bar chart also show which page has how many percentages of error.   We don’t want to use pie chart because it cannot display the time information.  We don’t want to use line chart because we don’t care how fast or slow does the error rate goes down or up.  One thing that we should implement is figure out the outlier who generated too many error due to their own reasons.  So we don’t have to worry about the outliner. 

### Performance Report Page:
/report/performance

In the performance vs time page, we use a line chart.  We thought about using bar chart, but bar chart is not a good way to show how the average loading time change from day to day.  In this case, we want to know the slope of average loading time from the user.  Than we can use this data to compare with the number of users visited on that day. If the number of users increase as the average loading time increase, we know it’s our server and bandwidth slowing users viewing experience.  If they are not correlated, we can go to the error report page to see if they have more errors than usual thus slowing their website down. Also, line chart can have multiple lines, so we can compare the load time between different pages.  We can see if they are all going up together, or it’s just one page.  If it’s just one page, we can just figure out what is the wrong of that page. 

### Display Report Page:
/report/display

For Screen Size Report, we use bubble to display screen size from User. The larger the bubble, it indicates that this screen size appears more often than other screen size.  The display is a very interesting set of data.  Most pc and phone has the same screen pixel.  We all use similar device and screen.  But it’s not always true.  For example, user might resize the windows.  We only care about the screen pixel size which most people have. So, we can clearly see that in a bubble chart.  We thought about using histgram but bubble chart just look nice and serve the same purpose.

## Future Features

In our current implementation for HW4, we are able to collect data from user characteristics, such as the device, browser, and screen resolutions of each user. We also identified how long each page loaded at various timestamps. Finally, we collected the number of errors generated and the number of visits to come up with an error rate. The data so far we collect gives us information about our audience -- knowing whether the majority of users are on desktop or mobile, or whether any of the users are using antique browsers. Thus, during decision-making, we are able to conclude that we might want to emphasize development on the majority preference. However, these information aren’t sufficient enough to help us study user behavior. We cannot tell if the users had a hard time navigating through our website.

One of the useful features that we have thought about is heatmap. Generally, a heatmap records the number of clicks or scrolls on a webpage and overlays the color-coded data on a webpage snapshot. Heatmaps aren’t like standard analytics reports, which make use of various charts to represent data. Heatmaps are more accessible because the visuals highlight the mostly interacted areas, which in turn makes it easier to analyze. However, heatmaps can be difficult to accurately show trends if we have a very small amount of data. Also, it is worth noting that on some pages heatmaps might not effectively show trends. For example, a form, heatmaps might only reveal the first form field being clicked on.

Another valuable feature is bounce rate. Bounce rate is calculated by the total number of one-page visits divided by the total number of entries to a website. For a static website like our test app, a high bounce rate is expected, meaning most users will leave the site without visiting a second page. A high bounce rate doesn’t necessarily mean that our webpage is bad because the user might have simply found whatever he’s looking for. If we manage to rebuild the test app to a service website, we should expect a low bounce rate, for example, 10% to 20%. 

Finally, a more advanced analytics tool is session replay. Session replay tools help site owners to understand how real visitors interact with their website. It records all user interaction events and generates a playback video. With session replay, we have a 100% coverage of monitoring performance problems on our live site. If a user ever encounters a bug, we can easily reproduce the scenario and debug efficiently. Although session replay helps us capture all bugs and enables us to react quickly, it won’t prevent bugs from happening at all. The best practice is to use session replay on staging environments to possibly take care of the bugs before the website goes to production.

All in all, data analytics helps us with decision-making. With the above features, we can make use of the deeper insights implied from the analytics to better achieve business goals and enhance the user experience. 
