let targetInput = document.getElementById("country"),
    results = document.getElementById("autocomplete-results"),
    countryList = ['Afghanistan',
        'Albania',
        'Algeria',
        'American Samoa',
        'Andorra',
        'Angola',
        'Anguilla',
        'Antigua and Barbuda',
        'Argentina',
        'Armenia',
        'Aruba',
        'Australia',
        'Austria',
        'Azerbaijan',
        'Bangladesh',
        'Barbados',
        'Bahamas',
        'Bahrain',
        'Belarus',
        'Belgium',
        'Belize',
        'Benin',
        'Bermuda',
        'Bhutan',
        'Bolivia',
        'Bosnia and Herzegovina',
        'Botswana',
        'Brazil',
        'British Indian Ocean Territory',
        'British Virgin Islands',
        'Brunei Darussalam',
        'Bulgaria',
        'Burkina Faso',
        'Burma',
        'Burundi',
        'Cambodia',
        'Cameroon',
        'Canada',
        'Cape Verde',
        'Cayman Islands',
        'Central African Republic',
        'Chad',
        'Chile',
        'China',
        'Christmas Island',
        'Cocos (Keeling) Islands',
        'Colombia',
        'Comoros',
        'Congo-Brazzaville',
        'Congo-Kinshasa',
        'Cook Islands',
        'Costa Rica',
        'Croatia',
        'Cura?ao',
        'Cyprus',
        'Czech Republic',
        'Denmark',
        'Djibouti',
        'Dominica',
        'Dominican Republic',
        'East Timor',
        'Ecuador',
        'El Salvador',
        'Egypt',
        'Equatorial Guinea',
        'Eritrea',
        'Estonia',
        'Ethiopia',
        'Falkland Islands',
        'Faroe Islands',
        'Federated States of Micronesia',
        'Fiji',
        'Finland',
        'France',
        'French Guiana',
        'French Polynesia',
        'French Southern Lands',
        'Gabon',
        'Gambia',
        'Georgia',
        'Germany',
        'Ghana',
        'Gibraltar',
        'Greece',
        'Greenland',
        'Grenada',
        'Guadeloupe',
        'Guam',
        'Guatemala',
        'Guernsey',
        'Guinea',
        'Guinea-Bissau',
        'Guyana',
        'Haiti',
        'Heard and McDonald Islands',
        'Honduras',
        'Hong Kong',
        'Hungary',
        'Iceland',
        'India',
        'Indonesia',
        'Iraq',
        'Ireland',
        'Isle of Man',
        'Israel',
        'Italy',
        'Jamaica',
        'Japan',
        'Jersey',
        'Jordan',
        'Kazakhstan',
        'Kenya',
        'Kiribati',
        'Kuwait',
        'Kyrgyzstan',
        'Laos',
        'Latvia',
        'Lebanon',
        'Lesotho',
        'Liberia',
        'Libya',
        'Liechtenstein',
        'Lithuania',
        'Luxembourg',
        'Macau',
        'Macedonia',
        'Madagascar',
        'Malawi',
        'Malaysia',
        'Maldives',
        'Mali',
        'Malta',
        'Marshall Islands',
        'Martinique',
        'Mauritania',
        'Mauritius',
        'Mayotte',
        'Mexico',
        'Moldova',
        'Monaco',
        'Mongolia',
        'Montenegro',
        'Montserrat',
        'Morocco',
        'Mozambique',
        'Namibia',
        'Nauru',
        'Nepal',
        'Netherlands',
        'New Caledonia',
        'New Zealand',
        'Nicaragua',
        'Niger',
        'Nigeria',
        'Niue',
        'Norfolk Island',
        'Northern Mariana Islands',
        'Norway',
        'Oman',
        'Pakistan',
        'Palau',
        'Panama',
        'Papua New Guinea',
        'Paraguay',
        'Peru',
        'Philippines',
        'Pitcairn Islands',
        'Poland',
        'Portugal',
        'Puerto Rico',
        'Qatar',
        'R?union',
        'Romania',
        'Russia',
        'Rwanda',
        'Saint Barth?lemy',
        'Saint Helena',
        'Saint Kitts and Nevis',
        'Saint Lucia',
        'Saint Martin',
        'Saint Pierre and Miquelon',
        'Saint Vincent',
        'Samoa',
        'San Marino',
        'S?o Tom? and Pr?ncipe',
        'Saudi Arabia',
        'Senegal',
        'Serbia',
        'Seychelles',
        'Sierra Leone',
        'Singapore',
        'Sint Maarten',
        'Slovakia',
        'Slovenia',
        'Solomon Islands',
        'Somalia',
        'South Africa',
        'South Georgia',
        'South Korea',
        'Spain',
        'Sri Lanka',
        'Sudan',
        'Suriname',
        'Svalbard and Jan Mayen',
        'Sweden',
        'Swaziland',
        'Switzerland',
        'Syria',
        'Taiwan',
        'Tajikistan',
        'Tanzania',
        'Thailand',
        'Togo',
        'Tokelau',
        'Tonga',
        'Trinidad and Tobago',
        'Tunisia',
        'Turkey',
        'Turkmenistan',
        'Turks and Caicos Islands',
        'Tuvalu',
        'Uganda',
        'Ukraine',
        'United Arab Emirates',
        'United Kingdom',
        'United States',
        'Uruguay',
        'Uzbekistan',
        'Vanuatu',
        'Vatican City',
        'Vietnam',
        'Venezuela',
        'Wallis and Futuna',
        'Western Sahara',
        'Yemen',
        'Zambia',
        'Zimbabwe'],
    matches = [],
    resultCursor = 0;

targetInput.focus()

targetInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault()
    }
})

targetInput.addEventListener("keyup", function (event) {
    /*
    * Key codes
    *
    * Enter: 13
    * Arrow up: 38
    * Arrow down: 40
    */

    results.innerHTML = "";
    toggleResults("hide");

    if (this.value.length > 0) {
        matches = getMatches(this.value);

        if (matches.length > 0) {
            displayMatches(matches);
        }
    }

    if (results.classList.contains("visible")) {
        switch (event.keyCode) {
            case 13:
                targetInput.value = results.children[resultCursor].innerHTML;
                toggleResults("hide");
                resultCursor = 0;
                break;
            case 38:
                if (resultCursor > 0) {
                    resultCursor--;
                    moveCursor(resultCursor)
                }
                break
            case 40:
                if (resultCursor < matches.length - 1) {
                    resultCursor++;
                    moveCursor(resultCursor);
                }
                break
        }
    }
});

function toggleResults(action) {
    if (action === "show") {
        results.classList.add("visible");
    } else if (action === "hide") {
        results.classList.remove("visible");
    }
}

function getMatches(inputText) {
    let matchList = [];

    for (let i = 0; i < countryList.length; i++) {
        if (countryList[i].toLowerCase().indexOf(inputText.toLowerCase()) !== -1) {
            matchList.push(countryList[i]);
        }
    }

    return matchList;
}

function displayMatches(matchList) {
    let j = 0;

    while (j < matchList.length) {
        results.innerHTML += '<li class="result">' + matchList[j] + '</li>';
        j++;
    }

    // The first child get a class of "highlighted"
    moveCursor(resultCursor);

    // Show the results
    toggleResults("show");
}

function moveCursor(pos) {
    for (let x = 0; x < results.children.length; x++) {
        results.children[x].classList.remove("highlighted")
    }

    results.children[pos].classList.add("highlighted");
}
