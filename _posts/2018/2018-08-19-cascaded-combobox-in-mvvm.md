---
layout: post
title: Creating WPF Cascaded ComboBox In MVVM
description: A .NET C# tutorial for creating WPF cascaded ComboBox using MVVM design pattern.
keywords: cascaded combobox, wpf mvvm
tags: [C#, WPF, MVVM, Programming]
comments: true
---

Developing enterprise-level software in .NET WPF usually requires you to work with [MVVM](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel) design pattern. This is what I have been doing mostly in Keysight as a full stack software engineer. Today I would like to share a simple .NET C# tutorial for creating WPF cascaded ComboBox using MVVM implementation.

### Understand the basic MVVM architecture

Before we get started, I would like to share how MVVM pattern works. Take a look on the diagram below:

{%
    include figure.html 
    src="http://i.imgur.com/kLUzCAs.gif" 
    caption="MVVM architecture"
%}

Here are some explanations about the diagram above:

- **View** - This is the UI code (XAML). The view is responsible for defining the structure, layout, and appearance of what the user sees on the screen. No business logic applied here.
- **Model** - This is a data model along with business and validation logic. We use this as the managers for particular classes.
- **ViewModel** - This is what we called the "glue" that binds _View_ and _Model_ together. It's responsible for handling the view logic (sometimes we called "UI logic"). Typically, the view model interacts with the model by invoking methods in the model classes. The view model then provides data from the model in a form that the view can easily use. The view model retrieves data from the model and then makes the data available to the view, and may reformat the data in some way that makes it simpler for the view to handle. The view model also provides implementations of commands that a user of the application initiates in the view.

### Getting started

This is the initial structure of the project looked like in my Visual Studio:

```
Solution 'ComboBoxMVVMExample' (1 project)
└── ComboBoxMVVMExample
	├── Properties
	├── References
	├── Model
	├── View
	├── ViewModel
	├── App.config
	├── App.xaml
	└── MainWindow.xaml
```

There are basically started with main directories called _Model_, _View_ and _ViewModel_. Within the _ViewModel_ directory, I created two common class files called `RelayCommand.cs` and `ViewModelBase.cs`:

```
Solution 'ComboBoxMVVMExample' (1 project)
└── ComboBoxMVVMExample
	├── Properties
	├── References
	├── Model
	├── View
	├── ViewModel
	|	├── RelayCommand.cs
	|	└── ViewModelBase.cs
	├── App.config
	├── App.xaml
	└── MainWindow.xaml
```

### Source code for the common classes

Here's the source code for `ViewModelBase.cs` file:

```csharp
using System;
using System.ComponentModel;
using System.Diagnostics;

namespace ComboBoxMVVMExample.ViewModel
{
    public abstract class ViewModelBase : INotifyPropertyChanged
    {
        [Conditional("DEBUG")]
        [DebuggerStepThrough]
        public virtual void VerifyPropertyName(string propertyName)
        {
            if (TypeDescriptor.GetProperties(this)[propertyName] == null)
            {
                string msg = "Invalid property name: " + propertyName;
                if (this.ThrowOnInvalidPropertyName)
                    throw new Exception(msg);
                else
                    Debug.Fail(msg);
            }
        }
        protected virtual bool ThrowOnInvalidPropertyName { get; private set; }
        public virtual void RaisePropertyChanged(string propertyName)
        {
            this.VerifyPropertyName(propertyName);
            OnPropertyChanged(propertyName);
        }
        public event PropertyChangedEventHandler PropertyChanged;
        protected virtual void OnPropertyChanged(string propertyName)
        {
            this.VerifyPropertyName(propertyName);
            PropertyChangedEventHandler handler = this.PropertyChanged;
            if (handler != null)
            {
                var e = new PropertyChangedEventArgs(propertyName);
                handler(this, e);
            }
        }
    }
}
```

> The `ViewModelBase` class implements `INotifyPropertyChanged` interface to enable the property binding between the _View_ and _ViewModel_ code.

Here's the source code for `RelayCommand.cs` file:

```csharp
using System;
using System.Diagnostics;
using System.Windows.Input;

namespace ComboBoxMVVMExample.ViewModel
{
    public class RelayCommand : ICommand
    {
        readonly Action<object> _execute;
        readonly Predicate<object> _canExecute;

        public RelayCommand(Action<object> execute)
            : this(execute, null)
        {
        }
        public RelayCommand(Action<object> execute, Predicate<object> canExecute)
        {
            if (execute == null)
                throw new ArgumentNullException("execute");

            _execute = execute;
            _canExecute = canExecute;
        }
        [DebuggerStepThrough]
        public bool CanExecute(object parameters)
        {
            return _canExecute == null ? true : _canExecute(parameters);
        }
        public event EventHandler CanExecuteChanged
        {
            add { CommandManager.RequerySuggested += value; }
            remove { CommandManager.RequerySuggested -= value; }
        }
        public void Execute(object parameters)
        {
            _execute(parameters);
        }
    }
}
```

> The `RelayCommand` class implements `ICommand` interface to enable the command binding between the _View_ and _ViewModel_ code.

These two classes are the basic common classes needed for MVVM implementation to work.

### Creating the View

> **DEFINITION:** The _View_ is the structure, layout and appearance of what a user sees on the screen.

Once everything is prepared, next is I created the View, a XAML file called `ComboBox.xaml` and placed it within the _View_ directory. This file contains the XAML code for the ComboBoxes and Button.

```
Solution 'ComboBoxMVVMExample' (1 project)
└── ComboBoxMVVMExample
	├── Properties
	├── References
	├── Model
	├── View
	|	└── ComboBox.xaml
	├── ViewModel
	|	├── RelayCommand.cs
	|	└── ViewModelBase.cs
	├── App.config
	├── App.xaml
	└── MainWindow.xaml
```

Here's the source code for `ComboBox.xaml` file:

```xml
<UserControl x:Class="ComboBoxMVVMExample.View.ComboBox"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006">
    <StackPanel Orientation="Vertical">
        <StackPanel Orientation="Horizontal" Margin="10">
            <Label Content="Get Enum items: " Margin="0 0 10 0" Width="120"/>
            <ComboBox Width="120" ItemsSource="{Binding EnumItems}" SelectedItem="{Binding EnumSelectedItem}" Margin="0 0 10 0"/>
            <Button Content="Show Selected Item" Command="{Binding ShowEnumItemCommand}"/>
        </StackPanel>

        <StackPanel Orientation="Horizontal" Margin="10">
            <Label Content="Get Country list: " Margin="0 0 10 0" Width="120"/>
            <ComboBox Width="120" ItemsSource="{Binding CountryList}" DisplayMemberPath="CountryName" SelectedValue="{Binding SelectedCountryCode}" SelectedValuePath="CountryTwoLetterCode" Margin="0 0 10 0"/>
            <Label Content="{Binding SelectedCountryCode}"/>
        </StackPanel>

        <StackPanel Orientation="Horizontal" Margin="10">
            <Label Content="Get State list: " Margin="0 0 10 0" Width="120"/>
            <ComboBox Width="120" ItemsSource="{Binding StateList}" DisplayMemberPath="StateName" SelectedValue="{Binding SelectedState}" SelectedValuePath="StateName" IsEnabled="{Binding AllowStateSelection}" Margin="0 0 10 0"/>
            <Label Content="{Binding SelectedState}"/>
        </StackPanel>
    </StackPanel>
</UserControl>
```

The code above contains 3 ComboBox elements. The first ComboBox is for `enum`-type list. This is just an example of binding the `ICommand` interface and use of `RelayCommand` class. The other two ComboBox elements are an example of the cascaded ComboBox using `List<T>` class.

Here's how the UI will be looked like:

{%
    include figure.html 
    src="http://i.imgur.com/OjRjTdJ.png" 
    caption="Final UI"
%}

### Understand the differences of SelectedItem, SelectedValue, SelectedValuePath and DisplayMemberPath

These are the commonly used properties for the ComboBox element, here are the differences:

- **`SelectedItem`** - This will return the entire currently selected item (object) from a particular collection of objects.
- **`SelectedValue`** - This property depends on `SelectedValuePath`. This will return a part of selected property from the selected object. If `SelectedValuePath` is not used, this will work as the same as using `SelectedItem`.
- **`SelectedValuePath`** - Setting this property will make the `SelectedValue` property returns the value of the property we have selected. For example, selecting "CountryTwoLetterCode" will make the `SelectedValue` returns only the two-letter code, not the whole country object.
- **`DisplayMemberPath`** - Setting this property to a property of the object that we to be displayed on UI.

## Creating the Model

> **DEFINITION:** The _Model_ is basically a business logic and data.

Now, I need to design the data model. So, I created an example model class file called `ExampleModel.cs` within the _Model_ directory.

```
Solution 'ComboBoxMVVMExample' (1 project)
└── ComboBoxMVVMExample
	├── Properties
	├── References
	├── Model
	|	└── ExampleModel.cs
	├── View
	|	└── ComboBox.xaml
	├── ViewModel
	|	├── RelayCommand.cs
	|	└── ViewModelBase.cs
	├── App.config
	├── App.xaml
	└── MainWindow.xaml
```

Here's the example code of `ExampleModel.cs` file:

```csharp
using ComboBoxMVVMExample.ViewModel; // ViewModelBase.cs
using System;
using System.Collections.Generic; // List<Country>

namespace ComboBoxMVVMExample.Model
{
    public class ExampleModel
    {
    }

    public enum EnumItem
    {
        Enum01,
        Enum02,
        Enum03
    }

    public class Country
    {
        public string CountryName { get; set; }
        public string CountryTwoLetterCode { get; set; }

        public List<Country> getCountries()
        {
            List<Country> returnCountries = new List<Country>();
            returnCountries.Add(new Country() { CountryName = "United States", CountryTwoLetterCode = "US" });
            returnCountries.Add(new Country() { CountryName = "Malaysia", CountryTwoLetterCode = "MY" });
            returnCountries.Add(new Country() { CountryName = "India", CountryTwoLetterCode = "IN" });
            return returnCountries;
        }
    }

    public class State
    {
        public string CountryTwoLetterCode { get; set; }
        public string StateName { get; set; }

        public List<State> getStatesCollection()
        {
            List<State> returnStates = new List<State>();
            returnStates.Add(new State() { CountryTwoLetterCode = "US", StateName = "New York" });
            returnStates.Add(new State() { CountryTwoLetterCode = "US", StateName = "Alaska" });
            returnStates.Add(new State() { CountryTwoLetterCode = "US", StateName = "West Virginia" });
            returnStates.Add(new State() { CountryTwoLetterCode = "MY", StateName = "Kelantan" });
            returnStates.Add(new State() { CountryTwoLetterCode = "MY", StateName = "Pulau Pinang" });
            returnStates.Add(new State() { CountryTwoLetterCode = "MY", StateName = "Selangor" });
            returnStates.Add(new State() { CountryTwoLetterCode = "IN", StateName = "Mumbai" });
            return returnStates;
        }

        public List<State> getStateByCountryCode(string countryCode)
        {
            List<State> stateList = new List<State>();
            foreach (State currentState in getStatesCollection())
            {
                if (currentState.CountryTwoLetterCode == countryCode)
                {
                    stateList.Add(new State() { CountryTwoLetterCode = currentState.CountryTwoLetterCode, StateName = currentState.StateName });
                }
            }
            return stateList;
        }
    }
}
```

From the code above, there are three object classes; **EnumItem**, **Country**, and **State**. 

- `CountryName`, `CountryTwoLetterCode` and `StateName` are the properties of the respective object classes (Country and State).
- `getCountries()` and `getStatesCollection()` are the instantiation methods used to get a list of Country and State respectively.
- `getStateByCountryCode(...)` is a method to get a list of states based on a particular country's two-letter code.
- `EnumItem` class is just an example of a list using the enum type.

## Creating the ViewModel

> **DEFINITION:** The _ViewModel_ is an abstraction of the _View_ exposing public properties and commands.

Finally, comes to the "glue" part. In this part, I created a view model class file called `ExampleViewModel.cs` within the _ViewModel_ directory.

```
Solution 'ComboBoxMVVMExample' (1 project)
└── ComboBoxMVVMExample
	├── Properties
	├── References
	├── Model
	|	└── ExampleModel.cs
	├── View
	|	└── ComboBox.xaml
	├── ViewModel
	|	├── ExampleViewModel.cs
	|	├── RelayCommand.cs
	|	└── ViewModelBase.cs
	├── App.config
	├── App.xaml
	└── MainWindow.xaml
```

Check out the self-explainable code written for `ExampleViewModel.cs` file below:

```csharp
using ComboBoxMVVMExample.Model; // ExampleEnum
using System;
using System.Collections.Generic; // IEnumerable
using System.Windows; // MessageBox
using System.Windows.Input; // ICommand
using System.Collections.ObjectModel; // ObservableCollection<Country>


namespace ComboBoxMVVMExample.ViewModel
{
    /// <summary>
    /// This class inherits from ViewModelBase class
    /// </summary>
    public class ExampleViewModel : ViewModelBase
    {
        #region ComboBox using enum type
        // Private Fields
        private IEnumerable<EnumItem> _EnumItems;
        private string _EnumSelectedItem;
        private ICommand _ShowEnumItemCommand;

        // Public Properties - Used for binding with the View
        public IEnumerable<EnumItem> EnumItems
        {
            get {
                // Whatever type of the enum, return them the same too
                return (EnumItem[])Enum.GetValues(typeof(EnumItem));
            }
            set
            {
                if (value != _EnumItems)
                {
                    _EnumItems = value;
                    OnPropertyChanged("EnumItems");
                }
            }
        }
        public string EnumSelectedItem
        {
            get { return _EnumSelectedItem; }
            set
            {
                _EnumSelectedItem = value;
                OnPropertyChanged("EnumSelectedItem");
            }
        }
        public ICommand ShowEnumItemCommand
        {
            get
            {
                _ShowEnumItemCommand = new RelayCommand(
                    param => ShowEnumItemMethod()
                );
                return _ShowEnumItemCommand;
            }
        }

        // Private Method
        private void ShowEnumItemMethod()
        {
            // Get combobox current selected value
            MessageBox.Show(EnumSelectedItem);
        }
        #endregion

        #region Cascaded ComboBox using List<T> class
        // Private Fields
        private List<Country> _CountryList;
        private string _SelectedCountryCode;
        private List<State> _StateList;
        private string _SelectedState;

        // Public Properties - Used for binding with the View
        public List<Country> CountryList {
            get { return _CountryList; }
            set
            {
                _CountryList = value;
                OnPropertyChanged("CountryList");
            }
        }
        public string SelectedCountryCode
        {
            get { return _SelectedCountryCode; }
            set
            {
                _SelectedCountryCode = value;
                OnPropertyChanged("SelectedCountryCode");
                OnPropertyChanged("AllowStateSelection"); // Trigger Enable/Disable UI element when particular country is selected
                getStateList(); // Generate a new list of states based on a selected country
            }
        }
        public List<State> StateList
        {
            get { return _StateList; }
            set
            {
                _StateList = value;
                OnPropertyChanged("StateList");
            }
        }
        public string SelectedState
        {
            get { return _SelectedState; }
            set
            {
                _SelectedState = value;
                OnPropertyChanged("SelectedState");
            }
        }
        public bool AllowStateSelection
        {
            get { return (SelectedCountryCode != null); }
        }

        // Constructor
        public ExampleViewModel()
        {
            // Instantiate, get a list of countries from the Model
            Country _Country = new Country();
            CountryList = _Country.getCountries();
        }

        // Private Method
        private void getStateList()
        {
            // Instantiate, get a list of states based on selected country two-letter code from the Model
            State _State = new State();
            StateList = _State.getStateByCountryCode(SelectedCountryCode);
        }
        #endregion
    }
}
```

The public properties in the code above are usually used to bind with the _View_. In order for the _ViewModel_ to participate in two-way data binding with the _View_, the setter property must raise the **PropertyChanged** event using `OnPropertyChanged("PropertyName");` method.

View model satisfies this requirement by implementing the [INotifyPropertyChanged](https://msdn.microsoft.com/en-us/library/system.componentmodel.inotifypropertychanged.aspx) interface and raising the **PropertyChanged** event when a property is changed. Listeners can respond appropriately to the property changes when they occur. You may refer to `ViewModelBase.cs` file on how it was implemented.

### Connecting the ViewModel to the View

There are many approaches to connect a view model to a view, including direct relations and container-based approaches. However, all share the same goal, which is for the view to have a view model assigned to its **DataContext** property. Views can be connected to view models in a code-behind file (C#), or in the view itself (XAML).

In this example, I connected the view model from the view itself. So, I don't need to touch the code-behind file. I used `MainWindow.xaml` file as the main window UI for this tutorial:

```xml
<Window x:Class="ComboBoxMVVMExample.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:view="clr-namespace:ComboBoxMVVMExample.View"
        xmlns:viewModel="clr-namespace:ComboBoxMVVMExample.ViewModel"
        Title="MainWindow" Height="350" Width="525">
    <Window.DataContext>
        <viewModel:ExampleViewModel/>
    </Window.DataContext>
    <Grid>

    </Grid>
</Window>
```

From the XAML code above, I added two new namespaces called `view` and `viewModel`. From there, I was able to use `Window.DataContext` to point to the `ExampleViewModel` class (the _ViewModel_).

Here's the final code for `MainWindow.xaml` file after I included the _View_ from `ComboBox.xaml` file:

```xml
<Window x:Class="ComboBoxMVVMExample.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:view="clr-namespace:ComboBoxMVVMExample.View"
        xmlns:viewModel="clr-namespace:ComboBoxMVVMExample.ViewModel"
        Title="MainWindow" Height="350" Width="525">
    <Window.DataContext>
        <viewModel:ExampleViewModel/>
    </Window.DataContext>

    <Grid>
        <StackPanel Orientation="Vertical" HorizontalAlignment="Center" VerticalAlignment="Center">
            <view:ComboBox/>
        </StackPanel>
    </Grid>

</Window>
```

After it was successfully compiled, at first nothing was selected, so the ComboBox for **State** will be disabled by default. But, whenever I started select a **Country** e.g. "Malaysia", the ComboBox for **State** will be automatically enabled, instantiated and a list of example states within Malaysia will be populated. This is how the cascaded ComboBox works with the MVVM implementation.

{%
    include figure.html 
    src="http://i.imgur.com/LlC4BmP.png" 
    caption="Demonstration of cascaded ComboBox"
%}

### Advantages of MVVM design pattern

The bottom line is that MVVM enables a great developer-designer workflow, providing these benefits:

- During the development process, **developers and designers can work more independently and concurrently** on their components. The designers can concentrate on the view, and if they are using Expression Blend, they can easily generate sample data to work with, while the developers can work on the view model and model components.
- The developers can **create unit tests for the view model and the model without using the view**. The unit tests for the view model can exercise exactly the same functionality as used by the view.
- It is **easy to redesign the UI of the application without touching the business logic code** because the view is implemented entirely in XAML. A new version of the view should work with the existing view model.
- If there is an existing implementation of the model that encapsulates existing business logic, it may be difficult or risky to change. In this scenario, **the view model acts as an adapter** for the model classes and enables you to avoid making any major changes to the model code.

### Download

The complete source code for this tutorial can be downloaded from the [GitHub](https://github.com/heiswayi/ComboBoxMVVMExample).