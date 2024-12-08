---
layout: post
title: "DIY Franken-Charger: Merging Two Chargers into One"
date: 2024-12-08
last_modified_at: 2024-12-08
categories: blog
tags: [DIY] 
cover-img: /assets/img/2024-12-08-franken-charger-hero.png
thumbnail-img: /assets/img/2024-12-08-franken-charger-thumb.png
share-img: /assets/img/2024-12-08-franken-charger-thumb.png
excerpt: "What do you do if you find yourself in a situation where you have one set with a working charger but a faulty battery, and another incompatible set with a working battery but a faulty charger?" 
---
Manufacturers of power tools often switch connectors between batteries and their chargers. So, what do you do if you find yourself in a situation where you have one set with a working charger but a faulty battery, and another incompatible set with a working battery but a faulty charger? In such cases, repurposing components can be a practical solution. By taking the connector parts from the faulty chargers and seamlessly mounting them onto the working one, you can create a functional charging system.

# My power drills
While doing some odd jobs around the house with my Powerplus drill, I noticed the battery was running low. When I went to charge it, I realized the "charging" light on the charger wasn't turning on. After some troubleshooting, I concluded that the charger was broken. Then I remembered I had a working Topcraft charger. Unfortunately, the connectors didn't fit, so I needed to get creative.

<img src="/assets/img/2024-12-08-top-craft.png" align="left" width="200px" style="margin-right: 1rem;"/>
### Topcraft Drill/Screwdriver 18V Li-Ion
My old drill with a defective battery and a working 18V charger. The drill still worked but I could not find replacement batteries for it anymore. I had bought the Powerplus as a replacement so this one was sitting unused on the shelf.
<br clear="left"/>

<img src="/assets/img/2024-12-08-power-plus.jpg" align="left" width="200px" style="margin-right: 1rem;"/>
### Powerplus Drill/Screwdriver 20V Li-Ion
My new drill has working batteries but a defective charger, a flaw I discovered months after purchasing it. It's much lighter than my ancient Topcraft drill so that's the one I want to salvage. 
<br clear="left"/>

# The faulty charger
The connector of this charger consists of three parallel copper at DC+ (unlabeled), ground, and minus. The DC+ plate supplies positive direct current for charging  the battery. Ground serves as the common return path, and the minus plate is the negative terminal, completing the circuit. Additionally, there is a plus sign label indicating where the corresponding connection on the drill is which is not connected on the charger.

<div class="card-container">
  <img src="/assets/img/2024-12-08-power-plus-connection-out.jpg" width="225px"/>
  <img src="/assets/img/2024-12-08-power-plus-connection-in.jpg" width="225px"/>
  <img src="/assets/img/2024-12-08-power-plus-connection-connector.jpg" width="225px"/>
</div>

# The test setup

To test the setup, I opened the old, working Topcraft charger and disconnected the wires from the connector of the newer but broken charger. I then connected these wires to the corresponding connectors on the old working charger. 

<div style="text-align:center">
  <img src="/assets/img/2024-12-08-topcraft-circuit.jpg" width="75%" />
</div>

After that, I attached a battery to see if it worked, and yes, the "charging" light came on. After about fifteen minutes of charging, I tested the battery by successfully powering my drill with it.

<div style="text-align:center">
  <img src="/assets/img/2024-12-08-topcraft-test.png" width="75%" />
</div>

# The final result
To ensure safety, the test setup couldn't be left as it was. I removed the connector from the broken charger and drilled holes in the top of the working charger, then securely fastened the connector. Inside, I carefully soldered the wires and finished them with electrical tape for a clean and secure fit. And here is the final result

<img src="/assets/img/2024-12-08-topcraft-powerplus.png"/>

Despite the old charger operating at a lower voltage than the newer one, my batteries fully charged. However, it's crucial to mention that modifying chargers in this manner can be risky. Always monitor the charging process and never leave the charger unattended. Ensuring proper safety precautions can prevent potential hazards and keep your DIY projects safe.