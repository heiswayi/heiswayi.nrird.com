---
layout: post
title: XML serialization & deserialization helper class in .NET
description: XmlHelper class is part of C# utilities for XML data serialization and deserialization that I wrote to be used in my .NET projects.
tags: [Programming, C#, Utility]
comments: true
---

<a href="https://gist.github.com/heiswayi/cb66748bc11efe360ad6c233fa8e603f" class="button big">XmlHelper.cs<br><span style="font-size:0.8rem;opacity:0.7">Source Code on Gist</span></a>

I wrote this helper class because sometimes I would have some projects in .NET C# that need to save or retrieve data in the form of XML format. So, this helper class could help to ease my works with XML data serialization and deserialization.



### Usage examples

You need to create a **serializable object class** before you can use it and apply appropriate XML attribute to any necessary object property.

Example:

```csharp
using System.Collections.Generic;
using System.Xml.Serialization;

namespace XmlHelperConsoleApp
{
    [XmlRoot("MyCompanyEmployees2016")]
    public class CompanyEmployee
    {
        public List<Employee> EmployeeList { get; set; }
    }

    public class Employee
    {
        [XmlAttribute("Name")]
        public string Name { get; set; }

        [XmlAttribute("Age")]
        public int Age { get; set; }

        [XmlAttribute("Position")]
        public string Position { get; set; }

        [XmlAttribute("Department")]
        public Department Department { get; set; }
    }

    public enum Department
    {
        Technical,
        Marketing,
        Support
    }
}
```

Once you have your object class defined, you can start to use the XmlHelper class to **serialize** your data.

Example of serializing the object data into XML string:

```csharp
using HeiswayiNrird.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace XmlHelperConsoleApp
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            var employee1 = new Employee()
            {
                Name = "John Cornor",
                Age = 40,
                Position = "Technical Engineer",
                Department = Department.Technical
            };
            var employee2 = new Employee()
            {
                Name = "James Bond",
                Age = 44,
                Position = "Marketing Manager",
                Department = Department.Marketing
            };
            var employee3 = new Employee()
            {
                Name = "Jason Bourne",
                Age = 40,
                Position = "Field Application Engineer",
                Department = Department.Technical
            };

            var employeeList = new List<Employee>() { employee1, employee2, employee3 };

            var companyEmployee = new CompanyEmployee()
            {
                EmployeeList = employeeList
            };

            string xml = XmlHelper.SerializeToXmlString(companyEmployee);
            Console.WriteLine(xml);

            Console.ReadKey();
        }
    }
}
```

Here is the example of the XML output:

```xml
<?xml version="1.0" encoding="utf-8"?>
<MyCompanyEmployees2016>
  <EmployeeList>
    <Employee Name="John Cornor" Age="40" Position="Technical Engineer" Department="Technical" />
    <Employee Name="James Bond" Age="44" Position="Marketing Manager" Department="Marketing" />
    <Employee Name="Jason Bourne" Age="40" Position="Field Application Engineer" Department="Technical" />
  </EmployeeList>
</MyCompanyEmployees2016>
```

If you want to get specific value from the XML string, you need to **deserialize** it and retrieve the desired value.

Example:

```csharp
using HeiswayiNrird.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace XmlHelperConsoleApp
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // string xml = <...XML-formatted string...>
            var obj = XmlHelper.DeserializeFromXmlString<CompanyEmployee>(xml);

            // Get list of employee names from Technical department
            var getTechnicalDept = obj.EmployeeList.Where(x => x.Department == Department.Technical).ToList();

            foreach (var employee in getTechnicalDept)
                Console.WriteLine(employee.Name);

            Console.ReadKey();
        }
    }
}
```

Example output:

```
John Cornor
Jason Bourne
```



### Fixing Byte Order Mark (BOM) bug

BOM here means a Unicode character used to signal the endianness (byte order) of a text file or stream. At the beginning of writing this helper class, I have encountered with this kind of exception message when I tried to deserialize the XML string:

> "Data at the root level is invalid. Line 1, position 1."

After I did some googling, I found a [blog](http://www.ipreferjim.com/2014/09/data-at-the-root-level-is-invalid-line-1-position-1/) that explained the root cause and detailed solution. So, I implemented the suggested solution into the code as shown below:

```csharp
string _byteOrderMarkUtf8 = Encoding.UTF8.GetString(Encoding.UTF8.GetPreamble());
if (xml.StartsWith(_byteOrderMarkUtf8))
{
    xml = xml.Remove(0, _byteOrderMarkUtf8.Length);
}
```